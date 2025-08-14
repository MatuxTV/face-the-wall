import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const { name, email, message } = body;

    // Validate the required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Configure the Nodemailer transporter for WebSupport
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST!,
      port: Number(process.env.EMAIL_PORT),
      secure: true, // Use SSL/TLS
      auth: {
        user: process.env.EMAIL_USER!, // Your WebSupport email address
        pass: process.env.EMAIL_PASSWORD!, // Your WebSupport email password
      },
    } as SMTPTransport.Options);

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER, // Use your email address
      to: 'matux.zajko@gmail.com', // Send email to your own address
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #007BFF;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f9f9f9; padding: 10px; border-left: 4px solid #007BFF;">${message}</p>
          <hr style="border: 0; border-top: 1px solid #ccc;" />
          <p style="font-size: 0.9em; color: #555;">This is an automated message from MOVI WORKS.</p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    return new Response(JSON.stringify({ message: "Error sending email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
