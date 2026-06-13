import nodemailer from "nodemailer";

const mailUser = process.env.MAIL_USER;
const mailFromName = process.env.MAIL_FROM_NAME || "ShutterPics";

function getFromAddress() {
  return `"${mailFromName}" <${mailUser}>`;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: mailUser,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    minVersion: "TLSv1.2",
  },
});

export async function sendMail({ to, subject, text, html, replyTo }) {
  return transporter.sendMail({
    from: getFromAddress(),
    to,
    replyTo,
    subject,
    text,
    html,
    headers: {
      "X-Entity-Ref-ID": `shutterpics-${Date.now()}`,
    },
  });
}

export async function verifyMailerConnection() {
  if (!mailUser || !process.env.MAIL_PASS) {
    console.warn("MAIL_USER or MAIL_PASS is not configured.");
    return false;
  }

  try {
    await transporter.verify();
    return true;
  } catch (err) {
    console.error("Email transport verification failed:", err.message);
    return false;
  }
}
