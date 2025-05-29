import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
export async function POST(request: NextRequest) {
    try {
        const { to, subject, html, formData } = await request.json()
        if (!to || !subject || !html) {
            return NextResponse.json(
                { success: false, message: "Thiếu dữ liệu email." },
                { status: 400 }
            );
        }
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        // Mô phỏng gửi email thành công
        console.log("📧 Sending email to:", to)
        console.log("📋 Subject:", subject)
        console.log("📄 Form data:", formData)

        // Mô phỏng delay gửi email
        // await new Promise((resolve) => setTimeout(resolve, 2000))
        await transporter.sendMail({
            from: `"Tuyển dụng Bạch Long" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        // return NextResponse.json({ success: true });
        // Trong thực tế, bạn sẽ sử dụng service như:
        // - EmailJS (miễn phí, dễ setup)
        // - Resend (chuyên nghiệp)
        // - SendGrid (enterprise)
        // - Nodemailer với SMTP

        // Ví dụ với EmailJS:
        /*
        const emailjs = require('@emailjs/nodejs')
        
        await emailjs.send(
          'YOUR_SERVICE_ID',
          'YOUR_TEMPLATE_ID',
          {
            to_email: to,
            subject: subject,
            html_content: html,
            from_name: formData.hovaten,
            from_email: formData.email
          },
          {
            publicKey: 'YOUR_PUBLIC_KEY',
            privateKey: 'YOUR_PRIVATE_KEY'
          }
        )
        */

        return NextResponse.json({
            success: true,
            message: "Email đã được gửi thành công!",
        })
    } catch (error) {
        console.error("Error sending email:", error)
        return NextResponse.json(
            {
                success: false,
                message: "Có lỗi xảy ra khi gửi email. Vui lòng thử lại sau.",
            },
            { status: 500 },
        )
    }
}
