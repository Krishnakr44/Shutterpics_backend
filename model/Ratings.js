import mongoose from "mongoose";
const { Schema } = mongoose;

const RatingSchema = new Schema({
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
  rate: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  feedback: {
    type: String,
    required: true,
    trim: true,
  },
});

const Rating = mongoose.model("rating", RatingSchema);

export default Rating;
