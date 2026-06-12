import mongoose from "mongoose";
const { Schema } = mongoose;

const OTPSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
    expires: 120,
  },
});

OTPSchema.index({ email: 1 }, { unique: true });

const OTPVerification = mongoose.model("otp", OTPSchema);

export default OTPVerification;
