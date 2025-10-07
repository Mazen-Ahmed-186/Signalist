import nodemailer from "nodemailer"
import {WELCOME_EMAIL_TEMPLATE} from "@/lib/nodemailer/templates";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    }
})

export const sendWelcomeEmail = async ({ email, intro, name }: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace("{{name}}", name).replace("{{intro}}", intro);

    const emailOptions = {
        from: "Signalist <signalist@mazenahmed.tech>",
        to: email,
        subject: "Welcome to signalist - your stock market tool is ready!",
        text: "Thanks for joining signalist",
        html: htmlTemplate,
    }

    await transporter.sendMail(emailOptions);
}