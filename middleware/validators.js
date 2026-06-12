import { body } from "express-validator";

export const createUserRules = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("type")
    .isIn(["customer", "admin"])
    .withMessage("Invalid user type"),
];

export const loginUserRules = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const verifyOtpRules = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("otp").notEmpty().withMessage("OTP is required"),
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("contactnum").isNumeric().withMessage("Contact number must be numeric"),
  body("address").trim().notEmpty().withMessage("Address is required"),
];

export const resetPasswordRules = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("otp").notEmpty().withMessage("OTP is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const requestResetPasswordRules = [
  body("email").isEmail().withMessage("Please provide a valid email"),
];

export const slotBookingRules = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("contactnum").isNumeric().withMessage("Contact number must be numeric"),
  body("address").trim().notEmpty().withMessage("Address is required"),
  body("bookingdate").notEmpty().withMessage("Booking date is required"),
  body("timeslot").trim().notEmpty().withMessage("Time slot is required"),
  body("eventname").trim().notEmpty().withMessage("Event name is required"),
  body("prize").trim().notEmpty().withMessage("Price is required"),
];

export const contactRules = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("contactnum").isNumeric().withMessage("Contact number must be numeric"),
  body("address").trim().notEmpty().withMessage("Address is required"),
  body("message").trim().notEmpty().withMessage("Message is required"),
];

export const rateUsRules = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("feedback").trim().notEmpty().withMessage("Feedback is required"),
  body("rate")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
];
