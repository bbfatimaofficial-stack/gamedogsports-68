import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ConsultationPayload {
  name: string;
  email: string;
  phone?: string | null;
  sport?: string | null;
  message: string;
  honeypot?: string; // Spam prevention field
}

// Rate limiting storage (in-memory for edge function)
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // Max 5 submissions per hour per IP
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Input sanitization helper
function sanitizeString(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

// Rate limiting check
function checkRateLimit(clientIP: string): boolean {
  const now = Date.now();
  const userLimit = rateLimit.get(clientIP);
  
  if (!userLimit || now > userLimit.resetTime) {
    // Reset or initialize rate limit
    rateLimit.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (userLimit.count >= RATE_LIMIT_MAX) {
    console.warn(`Rate limit exceeded for IP: ${clientIP}`);
    return false;
  }
  
  userLimit.count++;
  return true;
}

// Enhanced validation
function validatePayload(payload: ConsultationPayload): { valid: boolean; error?: string } {
  // Check honeypot field for spam
  if (payload.honeypot && payload.honeypot.trim() !== '') {
    console.warn('Spam detected: honeypot field filled');
    return { valid: false, error: 'Invalid submission' };
  }
  
  // Validate required fields
  if (!payload.name || !payload.email || !payload.message) {
    return { valid: false, error: 'Missing required fields: name, email, message' };
  }
  
  // Validate field lengths
  if (payload.name.length < 2 || payload.name.length > 100) {
    return { valid: false, error: 'Name must be between 2 and 100 characters' };
  }
  
  if (payload.message.length < 10 || payload.message.length > 2000) {
    return { valid: false, error: 'Message must be between 10 and 2000 characters' };
  }
  
  // Validate email format
  if (!EMAIL_REGEX.test(payload.email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  // Validate phone if provided
  if (payload.phone && payload.phone.length > 0) {
    const phoneClean = payload.phone.replace(/\D/g, '');
    if (phoneClean.length < 10 || phoneClean.length > 15) {
      return { valid: false, error: 'Invalid phone number format' };
    }
  }
  
  return { valid: true };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || 
                    req.headers.get('x-real-ip') || 
                    'unknown';
    
    console.log('Processing consultation email request...', { clientIP });

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again in an hour.' }),
        { status: 429, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      throw new Error('RESEND_API_KEY not configured');
    }

    console.log('Resend API key found, initializing Resend client...');
    const resend = new Resend(resendApiKey);

    const payload: ConsultationPayload = await req.json();
    
    // Enhanced validation
    const validation = validatePayload(payload);
    if (!validation.valid) {
      console.error('Validation failed:', validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Sanitize inputs
    const sanitizedPayload = {
      name: sanitizeString(payload.name),
      email: payload.email.toLowerCase().trim(),
      phone: payload.phone ? sanitizeString(payload.phone) : null,
      sport: payload.sport ? sanitizeString(payload.sport) : null,
      message: sanitizeString(payload.message)
    };

    console.log('Validated payload:', { 
      name: sanitizedPayload.name, 
      email: sanitizedPayload.email, 
      phone: sanitizedPayload.phone, 
      sport: sanitizedPayload.sport,
      messageLength: sanitizedPayload.message?.length,
      clientIP 
    });

    const { name, email, phone, sport, message } = sanitizedPayload;

    console.log('Sending admin notification email...');
    // Admin notification email
    let adminEmailSuccess = false;
    let adminEmailError = null;
    
    try {
      const adminEmailResponse = await resend.emails.send({
        from: 'Game Dogs Sports <noreply@gamedogsports.com>',
        to: ['ContactcarolinaGD@gmail.com'],
        subject: `🚨 New Consultation Request from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #000; color: #fff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #fff;">🏆 New Consultation Request</h1>
            </div>
            <div style="background-color: #f5f5f5; padding: 30px; border-radius: 0 0 8px 8px;">
              <h2 style="color: #d32f2f; margin-top: 0;">Contact Details</h2>
              <div style="background-color: #fff; padding: 20px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #d32f2f;">
                <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                ${phone ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
                ${sport ? `<p style=\"margin: 5px 0;\"><strong>Primary Sport:</strong> ${sport}</p>` : ''}
              </div>
              <h3 style="color: #d32f2f;">Message:</h3>
              <div style="background-color: #fff; padding: 20px; border-radius: 6px; border: 1px solid #ddd;">
                <p style="margin: 0; line-height: 1.6;">${message}</p>
              </div>
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${email}" style="background-color: #d32f2f; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reply to ${name}</a>
              </div>
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
              <p style="font-size: 12px; color: #666; text-align: center;">
                This email was sent from your Game Dogs Sports website contact form.<br>
                Submitted on: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST
              </p>
            </div>
          </div>
        `,
      });

      console.log('Admin email API response:', JSON.stringify(adminEmailResponse, null, 2));
      
      if (adminEmailResponse.error) {
        console.error('Admin email API returned error:', adminEmailResponse.error);
        adminEmailError = adminEmailResponse.error.message || 'Unknown admin email error';
        throw new Error(`Admin email failed: ${adminEmailResponse.error.message}`);
      }

      if (adminEmailResponse.data?.id) {
        console.log('✅ Admin email sent successfully! Email ID:', adminEmailResponse.data.id);
        console.log('Admin email details:', {
          id: adminEmailResponse.data.id,
          from: 'Game Dogs Sports <noreply@gamedogsports.com>',
          to: 'ContactcarolinaGD@gmail.com',
          subject: `🚨 New Consultation Request from ${name}`,
          timestamp: new Date().toISOString()
        });
        adminEmailSuccess = true;
      } else {
        console.error('❌ Admin email response missing data.id:', adminEmailResponse);
        adminEmailError = 'Admin email response missing ID';
      }
    } catch (adminError: any) {
      console.error('❌ CRITICAL: Failed to send admin email:', adminError);
      console.error('Admin email error details:', {
        message: adminError.message,
        stack: adminError.stack,
        name: adminError.name,
        code: adminError.code
      });
      adminEmailError = adminError.message;
      // Don't throw here, continue with user email
    }

    console.log('Sending thank-you email to user...');
    // Thank-you email to user
    let userEmailSuccess = false;
    let userEmailError = null;
    
    try {
      const userEmailResponse = await resend.emails.send({
        from: 'Game Dogs Sports <noreply@gamedogsports.com>',
        to: [email],
        subject: 'Thank you for your consultation request - Game Dogs Sports',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #000; color: #fff; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #fff; font-size: 32px; font-weight: bold;">
                <span style="color: #fff;">Game Dogs</span> <span style="color: #dc2626;">Sports</span>
              </h1>
              <p style="margin: 10px 0 0 0; color: #ccc;">Elite Athletic Training</p>
            </div>
            <div style="background-color: #f5f5f5; padding: 40px; border-radius: 0 0 8px 8px;">
              <h2 style="color: #d32f2f; margin-top: 0;">Thank You, ${name}!</h2>
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                We've received your consultation request and we're excited to help you reach your athletic potential.
              </p>
              <div style="background-color: #fff; padding: 25px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #d32f2f;">
                <h3 style="color: #d32f2f; margin-top: 0;">What happens next?</h3>
                <ul style="padding-left: 20px; line-height: 1.8;">
                  <li><strong>Within 24 hours:</strong> Our team will review your information and contact you to schedule your free consultation</li>
                  <li><strong>During consultation:</strong> We'll discuss your goals, assess your current level, and create a personalized training plan</li>
                  <li><strong>Get started:</strong> Begin your journey to becoming the athlete you're meant to be</li>
                </ul>
              </div>
              <div style="background-color: #fff; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <h4 style="color: #333; margin-top: 0;">Your submitted information:</h4>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                ${phone ? `<p style=\"margin: 5px 0;\"><strong>Phone:</strong> ${phone}</p>` : ''}
                ${sport ? `<p style=\"margin: 5px 0;\"><strong>Primary Sport:</strong> ${sport}</p>` : ''}
              </div>
              <div style="background-color: #e8f5e8; padding: 20px; border-radius: 6px; margin: 25px 0;">
                <p style="margin: 0; color: #2d5a2d;">
                  <strong>📧 Questions?</strong> Email us at ContactcarolinaGD@gmail.com<br>
                  <strong>📞 Urgent?</strong> Call us at 910-638-4342
                </p>
              </div>
              <div style="text-align: center; margin-top: 30px;">
                <p style="color: #666; font-style: italic;">"Your championship journey starts now."</p>
                <p style="margin: 20px 0 0 0; color: #999; font-size: 12px;">
                  © Game Dogs Sports | 1122 Hawkins Ave, Sanford, NC 27330
                </p>
              </div>
            </div>
          </div>
        `,
      });

      console.log('User email API response:', JSON.stringify(userEmailResponse, null, 2));
      
      if (userEmailResponse.error) {
        console.error('User email API returned error:', userEmailResponse.error);
        userEmailError = userEmailResponse.error.message || 'Unknown user email error';
        throw new Error(`User email failed: ${userEmailResponse.error.message}`);
      }

      if (userEmailResponse.data?.id) {
        console.log('✅ User email sent successfully! Email ID:', userEmailResponse.data.id);
        userEmailSuccess = true;
      } else {
        console.error('❌ User email response missing data.id:', userEmailResponse);
        userEmailError = 'User email response missing ID';
      }
    } catch (userError: any) {
      console.error('❌ Failed to send user email:', userError);
      console.error('User email error details:', {
        message: userError.message,
        stack: userError.stack,
        name: userError.name,
        code: userError.code
      });
      userEmailError = userError.message;
    }

    // Comprehensive email delivery summary
    console.log('📊 EMAIL DELIVERY SUMMARY:');
    console.log('==========================');
    console.log(`Admin Email: ${adminEmailSuccess ? '✅ SUCCESS' : '❌ FAILED'}`);
    if (adminEmailError) console.log(`Admin Error: ${adminEmailError}`);
    console.log(`User Email: ${userEmailSuccess ? '✅ SUCCESS' : '❌ FAILED'}`);
    if (userEmailError) console.log(`User Error: ${userEmailError}`);
    console.log('==========================');

    // Determine response based on email delivery status
    const responseData = {
      success: true,
      message: 'Consultation request processed successfully',
      emailStatus: {
        adminEmail: adminEmailSuccess,
        userEmail: userEmailSuccess,
        adminError: adminEmailError,
        userError: userEmailError
      }
    };

    // If admin email failed, add a warning (but don't fail the request)
    if (!adminEmailSuccess) {
      responseData.message = 'Consultation request received. Admin notification may have failed - please contact us directly if urgent.';
      console.warn('⚠️  ADMIN EMAIL DELIVERY FAILED - Admin may not receive notification!');
    }

    return new Response(
      JSON.stringify(responseData),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error: any) {
    console.error('Error in send-consultation-emails function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

serve(handler);
