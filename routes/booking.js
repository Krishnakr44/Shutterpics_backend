import dotenv from "dotenv";
import express from "express";
import Booking from "../model/Booking.js";
import fetchuser from "../middleware/fetchuser.js";
import { bookingmail } from "./sendmail.js";
import validate from "../middleware/validate.js";
import { slotBookingRules } from "../middleware/validators.js";

dotenv.config();

const router = express.Router();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getFutureBookings = () => {
  return Booking.find({ bookingdate: { $gt: new Date() } });
};

// Route 1 : Book the slot using : POST "/user/booking/slotbooking"
router.post(
  "/slotbooking",
  fetchuser,
  slotBookingRules,
  validate,
  async (req, res) => {
    const date = new Date();
    const currDate =
      date.getDate() +
      " " +
      months[date.getMonth()] +
      ", " +
      date.getFullYear();

    try {
      await Booking.create({
        userId: req.user.id,
        name: req.body.name,
        contactnum: req.body.contactnum,
        address: req.body.address,
        bookingdate: req.body.bookingdate,
        timeslot: req.body.timeslot,
        eventname: req.body.eventname,
        prize: req.body.prize,
        currdate: currDate,
      });

      bookingmail(req, res);
    } catch (err) {
      res.status(500).json({ message: "Internal server error occurred." });
    }
  }
);

// Route 2 : Get all the slot for admin using : GET "/user/booking/admin/getslots"
router.get("/admin/getslots", fetchuser, async (req, res) => {
  let success = false;
  if (req.user.type !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "You are not an Admin!" });
  }
  try {
    const data = await getFutureBookings();
    success = true;

    return res.status(200).json({ success, data });
  } catch (err) {
    res.status(500).json({ message: "Internal server error occurred." });
  }
});

// Route 3 : Get all booked dates using : GET "/user/booking/getslots"
router.get("/getslots", async (req, res) => {
  let success = false;
  try {
    const slots = await getFutureBookings();
    const data = slots.map((slot) => slot.bookingdate);

    success = true;

    return res.status(200).json({ success, data });
  } catch (err) {
    res.status(500).json({ message: "Internal server error occurred." });
  }
});

// Route 4 : Get slot booking by the user using : GET "/user/booking/myslot"
router.get("/myslot", fetchuser, async (req, res) => {
  let success = false;
  try {
    const user = req.user;
    const slots = await Booking.find({ userId: user.id });

    success = true;
    return res.status(200).json({ success, data: slots });
  } catch (err) {
    res.status(500).json({ message: "Internal server error occurred." });
  }
});

export default router;
