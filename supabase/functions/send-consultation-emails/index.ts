import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConsultationEmailRequest {
  name: string;
  email: string;
  phone?: string | null;
  sport?: string | null;
  message: string;
  honeypot?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, sport, message, honeypot }: ConsultationEmailRequest = await req.json();

    console.log("Processing consultation email for:", name);

    // Server-side spam detection
    if (honeypot && honeypot.trim() !== '') {
      console.warn("Spam detected via honeypot - rejecting request");
      return new Response(
        JSON.stringify({ error: "Invalid submission" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send confirmation email to the user
    const userEmailResponse = await resend.emails.send({
      from: "Game Dogs Sports <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting Game Dogs Sports!",
      html: `
        <h1>Thank you for reaching out, ${name}!</h1>
        <p>We have received your consultation request and will contact you within 24 hours to discuss your training goals.</p>
        <p><strong>Your submission details:</strong></p>
        <ul>
          ${phone ? `<li>Phone: ${phone}</li>` : ''}
          ${sport ? `<li>Sport: ${sport}</li>` : ''}
          <li>Message: ${message}</li>
        </ul>
        <p>If you have any urgent questions, feel free to call us at <strong>910-638-4342</strong></p>
        <p>Best regards,<br>Game Dogs Sports Team</p>
      `,
    });

    console.log("User confirmation email sent:", userEmailResponse);

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Game Dogs Sports Notifications <onboarding@resend.dev>",
      to: ["ContactcarolinaGD@gmail.com"],
      subject: `New Consultation Request from ${name}`,
      html: `
        <h1>New Consultation Request</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${sport ? `<p><strong>Sport:</strong> ${sport}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>This is an automated notification from your website's contact form.</em></p>
      `,
    });

    console.log("Admin notification email sent:", adminEmailResponse);

    return new Response(
      JSON.stringify({
        success: true,
        emailStatus: {
          userEmail: userEmailResponse.data?.id ? true : false,
          adminEmail: adminEmailResponse.data?.id ? true : false,
          userError: userEmailResponse.error,
          adminError: adminEmailResponse.error,
        }
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-consultation-emails function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
