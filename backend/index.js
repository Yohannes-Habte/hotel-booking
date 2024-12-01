import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import colors from "colors";
import multer from "multer";
import "./database/databaseConfig.js";

// Router
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import paymentRouter from "./routes/paymentRoute.js";
import pagesRouter from "./routes/pageRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
const port = process.env.PORT || 3000;

// Express App
dotenv.config();
const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.RENDER_URL,
  process.env.NETLIFY_URL,
  "https://lisa-hotel.netlify.app",
];

const corsConfig = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));



// End points
app.use("/api/v1/users", userRouter);
app.use("/api/v1/hotels", hotelRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/pages", pagesRouter);
app.use("/api/v1/comments", commentRouter);

// Static assets
app.use(express.static("assets"));

// Global Error handler
app.use(globalErrorHandler);


// To run Express App, you need to do ...
app.listen(port, () => {

  console.log(`The server connected to: http://localhost:${port}`.yellow.bold);
});
