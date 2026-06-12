import dotenv from "dotenv";
import express from "express";
import { contactus } from "./sendmail.js";
import Ratings from "../model/Ratings.js";
import fetchuser from "../middleware/fetchuser.js";
import validate from "../middleware/validate.js";
import { contactRules, rateUsRules } from "../middleware/validators.js";

dotenv.config();

const router = express.Router();

router.post("/mailus", contactRules, validate, async (req, res) => {
  try {
    contactus(req, res);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error occurred." });
  }
});

router.post("/rateus", fetchuser, rateUsRules, validate, async (req, res) => {
  try {
    await Ratings.create({
      userId: req.user.id,
      name: req.body.name,
      feedback: req.body.feedback,
      rate: req.body.rate,
    });

    return res
      .status(200)
      .json({ success: true, message: "Thanks for your feedback!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/getrate", async (req, res) => {
  try {
    const ratings = await Ratings.find();

    return res.status(200).json({ success: true, ratings });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error occurred." });
  }
});

export default router;
