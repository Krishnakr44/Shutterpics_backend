import mongoose from "mongoose";
const { Schema } = mongoose;

const CustomerSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  contactnum: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
});

CustomerSchema.index({ userId: 1 }, { unique: true });

const Customer = mongoose.model("customer", CustomerSchema);

export default Customer;
