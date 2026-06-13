import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import OTPVerification from "../model/OTP.js";
import { sendMail } from "../utils/mailer.js";
import {
  otpEmail,
  contactNotificationEmail,
  bookingNotificationEmail,
} from "../utils/emailTemplates.js";

dotenv.config();

const OTP_TTL_MS = 2 * 60 * 1000;

async function saveHashedOtp(email, secOTP) {
  await OTPVerification.findOneAndUpdate(
    { email },
    {
      email,
      otp: secOTP,
      timestamp: new Date(),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
}

async function sendOTP(req, res) {
  const email = req.body.email?.toLowerCase().trim();
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
  const purpose = req.originalUrl?.includes("resetpassword")
    ? "password reset"
    : "account verification";
  const { subject, text, html } = otpEmail(otp, purpose);

  try {
    const salt = await bcrypt.genSalt(10);
    const secOTP = await bcrypt.hash(otp, salt);

    await saveHashedOtp(email, secOTP);
    await sendMail({
      to: email,
      subject,
      text,
      html,
    });

    return res.status(201).json({
      success: true,
      message: "OTP has been sent successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error occurred. Please try again!",
    });
  }
}

export async function contactus(req, res) {
  const { subject, text, html } = contactNotificationEmail(req.body);

  try {
    await sendMail({
      to: process.env.MAIL_USER,
      replyTo: req.body.email,
      subject,
      text,
      html,
    });

    return res.status(201).json({
      success: true,
      message: "Thank you! We will contact you soon",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error, Unable to send message",
    });
  }
}

export async function bookingmail(req, res) {
  const { subject, text, html } = bookingNotificationEmail(req.body);

  try {
    await sendMail({
      to: process.env.MAIL_USER,
      subject,
      text,
      html,
    });

    return res.status(201).json({
      success: true,
      message: "Thank you! We will contact you soon",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error, Unable to send message",
    });
  }
}

export function isOtpValid(storedTimestamp) {
  return Date.now() <= new Date(storedTimestamp).getTime() + OTP_TTL_MS;
}

export default sendOTP;
