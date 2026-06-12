import mongoose from "mongoose";
const { Schema } = mongoose;

const BookingSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
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
    timeslot: {
      type: String,
      required: true,
      trim: true,
    },
    eventname: {
      type: String,
      required: true,
      trim: true,
    },
    bookingdate: {
      type: Date,
      required: true,
    },
    currdate: {
      type: String,
      required: true,
    },
    prize: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

BookingSchema.index({ userId: 1, bookingdate: 1 });

const Booking = mongoose.model("booking", BookingSchema);

export default Booking;
