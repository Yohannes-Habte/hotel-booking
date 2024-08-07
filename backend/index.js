import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import colors from 'colors';
import multer from 'multer';

// Router
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import roomRouter from './routes/roomRoutes.js';
import paymentRouter from './routes/paymentRoute.js';
import pagesRouter from './routes/pageRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import globalErrorHandler from './middlewares/globalErrorHandler.js';


// Express App
const app = express();
app.use(cookieParser());
app.use(cors({origin: ["http://localhost:3000", "http://hotel-booking-app.onrender.com"]}));
app.use(express.json());


// Mongoose
dotenv.config();
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('DB is connected!'.green.bold);
  } catch (error) {
    console.error;
  }
};

// End points
app.use('/api/v1/users', userRouter);
app.use('/api/v1/hotels', hotelRouter);
app.use('/api/v1/rooms', roomRouter);
app.use('/api/v1/payment', paymentRouter);
app.use('/api/v1/pages', pagesRouter);
app.use('/api/v1/comments', commentRouter);

// Static assets
app.use(express.static('assets'));

// Global Error handler
app.use(globalErrorHandler);
const port = process.env.PORT || 3000;

// To run Express App, you need to do ...
app.listen(port, () => {
  connectToDB();
  console.log(`The server connected to: http://localhost:${port}`.yellow.bold);
});
