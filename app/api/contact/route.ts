import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();




    // Configure transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.in",
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const res = await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO, // your destination email
      subject: `New Contact Request - ${name}`,
      text: `
✨ New Contact Request Received ✨

You’ve received a new message through your website contact form.

────────────────────────────────
👤 Name   : ${name}
📧 Email  : ${email}
📞 Phone  : ${phone || "Not provided"}
────────────────────────────────

💬 Message
${message}

────────────────────────────────
This email was automatically generated from your website.
`,

    });


    console.log("Message sent: ", res.messageId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
