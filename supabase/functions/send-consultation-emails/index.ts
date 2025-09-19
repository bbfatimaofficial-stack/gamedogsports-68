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
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Processing consultation email request (direct payload)...');

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      throw new Error('RESEND_API_KEY not configured');
    }

    console.log('Resend API key found, initializing Resend client...');
    const resend = new Resend(resendApiKey);

    const payload: ConsultationPayload = await req.json();
    console.log('Received payload:', { 
      name: payload.name, 
      email: payload.email, 
      phone: payload.phone, 
      sport: payload.sport,
      messageLength: payload.message?.length 
    });

    const { name, email, phone, sport, message } = payload;

    if (!name || !email || !message) {
      console.error('Missing required fields:', { name: !!name, email: !!email, message: !!message });
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, email, message' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    console.log('Sending admin notification email...');
    // Admin notification email
    try {
      const adminEmailResponse = await resend.emails.send({
        from: 'Game Dog Sports <onboarding@resend.dev>',
        to: ['ContactcarolinaGD@gmail.com'],
        subject: `New Consultation Request from ${name}`,
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
            </div>
          </div>
        `,
      });

      console.log('Admin email response:', adminEmailResponse);
      
      if (adminEmailResponse.error) {
        console.error('Admin email error:', adminEmailResponse.error);
        throw new Error(`Admin email failed: ${adminEmailResponse.error.message}`);
      }

      console.log('Admin email sent successfully:', adminEmailResponse.data?.id);
    } catch (adminError: any) {
      console.error('Failed to send admin email:', adminError);
      console.error('Admin email error details:', {
        message: adminError.message,
        stack: adminError.stack,
        name: adminError.name
      });
      // Don't throw here, continue with user email
    }

    console.log('Sending thank-you email to user...');
    // Thank-you email to user
    try {
      const userEmailResponse = await resend.emails.send({
        from: 'Game Dog Sports <onboarding@resend.dev>',
        to: [email],
        subject: 'Thank you for your consultation request - Game Dog Sports',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #000; color: #fff; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #fff;">🏆 Game Dog Sports</h1>
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
                  © Game Dog Sports | 1122 Hawkins Ave, Sanford, NC 27330
                </p>
              </div>
            </div>
          </div>
        `,
      });

      console.log('User email response:', userEmailResponse);
      
      if (userEmailResponse.error) {
        console.error('User email error:', userEmailResponse.error);
        throw new Error(`User email failed: ${userEmailResponse.error.message}`);
      }

      console.log('User email sent successfully:', userEmailResponse.data?.id);
    } catch (userError: any) {
      console.error('Failed to send user email:', userError);
      console.error('User email error details:', {
        message: userError.message,
        stack: userError.stack,
        name: userError.name
      });
      // Continue execution, user will still get success response for form submission
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Consultation request processed successfully'
      }),
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
