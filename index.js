import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userauth from "./routes/userauth.js";
import booking from "./routes/booking.js";
import contact from "./routes/contact.js";
import { verifyMailerConnection } from "./utils/mailer.js";

const app = express();
dotenv.config();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to ShutterPics...");
});

// Available Routes
app.use("/user/userauth", userauth);
app.use("/user/booking", booking);
app.use("/contact", contact);

mongoose
  .connect(process.env.DB_URI)
  .then(async () => {
    console.log("Connected successfully");
    await verifyMailerConnection();
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
