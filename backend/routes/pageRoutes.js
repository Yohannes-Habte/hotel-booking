import express from 'express';
import { getAbout, getFooter, getHeader, getHotels, photos } from '../controllers/pageController.js';

// Pages Router
const pagesRouter = express.Router();

// Routes

pagesRouter.get('/rooms', photos);
pagesRouter.get('/header', getHeader);
pagesRouter.get('/footer', getFooter);
pagesRouter.get('/formInputs');
pagesRouter.get('/home/hotels', getHotels);
pagesRouter.get('/about', getAbout);

// Export Router
export default pagesRouter;
