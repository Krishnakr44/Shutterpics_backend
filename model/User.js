import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["customer", "admin"],
  },
  isverified: {
    type: Boolean,
    default: false,
  },
});

UserSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("user", UserSchema);

export default User;
