import { escapeHtml } from "./escapeHtml.js";

const siteName = process.env.MAIL_FROM_NAME || "ShutterPics";
const siteUrl = process.env.SITE_URL || "https://shutterpics.in";

function layout({ title, bodyHtml, footerText }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#18181b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="padding:24px 28px;background:#18181b;color:#ffffff;font-size:20px;font-weight:bold;">
              ${escapeHtml(siteName)}
            </td>
          </tr>
          <tr>
            <td style="padding:28px;font-size:15px;line-height:1.6;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px;font-size:12px;line-height:1.5;color:#71717a;">
              ${escapeHtml(footerText)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function otpEmail(otp, purpose = "account verification") {
  const safeOtp = escapeHtml(otp);
  const subject = `${siteName} verification code`;

  const text = [
    `Your ${siteName} verification code is: ${otp}`,
    "",
    `This code is for ${purpose} and expires in 2 minutes.`,
    `If you did not request this, you can ignore this email.`,
    "",
    siteUrl,
  ].join("\n");

  const html = layout({
    title: subject,
    bodyHtml: `
      <p style="margin:0 0 16px;">Use the verification code below to complete ${escapeHtml(purpose)}:</p>
      <p style="margin:0 0 20px;font-size:28px;font-weight:bold;letter-spacing:4px;color:#18181b;">${safeOtp}</p>
      <p style="margin:0 0 12px;">This code expires in <strong>2 minutes</strong>.</p>
      <p style="margin:0;">If you did not request this code, you can safely ignore this email.</p>
    `,
    footerText: `${siteName} · ${siteUrl}`,
  });

  return { subject, text, html };
}

export function contactNotificationEmail({ name, contactnum, email, address, message }) {
  const subject = `New contact form message — ${siteName}`;

  const text = [
    "New contact form submission",
    "",
    `Name: ${name}`,
    `Phone: ${contactnum}`,
    `Email: ${email}`,
    `Address: ${address}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = layout({
    title: subject,
    bodyHtml: `
      <p style="margin:0 0 16px;">You received a new message from your website contact form.</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;">
        <tr><td style="padding:6px 0;color:#71717a;width:120px;">Name</td><td style="padding:6px 0;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#71717a;">Phone</td><td style="padding:6px 0;">${escapeHtml(contactnum)}</td></tr>
        <tr><td style="padding:6px 0;color:#71717a;">Email</td><td style="padding:6px 0;">${escapeHtml(email)}</td></tr>
        <tr><td style="padding:6px 0;color:#71717a;">Address</td><td style="padding:6px 0;">${escapeHtml(address)}</td></tr>
      </table>
      <p style="margin:20px 0 8px;font-weight:bold;">Message</p>
      <p style="margin:0;white-space:pre-wrap;">${escapeHtml(message)}</p>
    `,
    footerText: `Reply directly to ${escapeHtml(email)} to respond.`,
  });

  return { subject, text, html };
}

export function bookingNotificationEmail({
  name,
  contactnum,
  address,
  bookingdate,
  eventname,
  timeslot,
}) {
  const date = new Date(bookingdate);
  const formattedDate = Number.isNaN(date.getTime())
    ? String(bookingdate)
    : `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

  const subject = `New booking request — ${siteName}`;

  const text = [
    "New booking request",
    "",
    `Name: ${name}`,
    `Phone: ${contactnum}`,
    `Address: ${address}`,
    `Booking date: ${formattedDate}`,
    `Event: ${eventname}`,
    `Time slot: ${timeslot}`,
  ].join("\n");

  const html = layout({
    title: subject,
    bodyHtml: `
      <p style="margin:0 0 16px;">A customer submitted a new booking request.</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;">
        <tr><td style="padding:6px 0;color:#71717a;width:120px;">Name</td><td style="padding:6px 0;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#71717a;">Phone</td><td style="padding:6px 0;">${escapeHtml(contactnum)}</td></tr>
        <tr><td style="padding:6px 0;color:#71717a;">Address</td><td style="padding:6px 0;">${escapeHtml(address)}</td></tr>
        <tr><td style="padding:6px 0;color:#71717a;">Date</td><td style="padding:6px 0;">${escapeHtml(formattedDate)}</td></tr>
        <tr><td style="padding:6px 0;color:#71717a;">Event</td><td style="padding:6px 0;">${escapeHtml(eventname)}</td></tr>
        <tr><td style="padding:6px 0;color:#71717a;">Time slot</td><td style="padding:6px 0;">${escapeHtml(timeslot)}</td></tr>
      </table>
    `,
    footerText: `${siteName} booking notification`,
  });

  return { subject, text, html };
}
