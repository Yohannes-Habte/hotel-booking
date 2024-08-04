import express from 'express';
import hotelPayment from '../controllers/paymentController.js';

// Payment Router
const paymentRouter = express.Router();

// Payment Route
paymentRouter.post('/', hotelPayment);

// Export payment router
export default paymentRouter;
