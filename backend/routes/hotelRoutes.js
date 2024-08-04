import express from 'express';
import {
  countByCity,
  countByType,
  createHotel,
  deleteAllHotels,
  deleteOneHotel,
  deleteRooms,
  getAllHotels,
  getHotelRooms,
  getOneHotel,
  getPhotos,
  getRooms,
  hotelCount,
  roomsCount,
  updateHotel,
} from '../controllers/hotelController.js';
import requiredValues from '../validators/requiredValues.js';
import hotelValidator from '../validators/hotelValidator.js';
import checkValidation from '../validators/checkValidation.js';

// Hotel Router
const hotelRouter = express.Router();

// Hotel Routes
hotelRouter.post(
  '/createHotel',
  requiredValues([
    'name',
    'type',
    'city',
    'address',
    'distance',
    'photos',
    'title',
    'description',
    'rating',
    'rooms',
    'cheapestPrice',
    'featured',
  ]),
  hotelValidator(),
  checkValidation,
  createHotel
);
hotelRouter.put('/updateHotel/:id', updateHotel);
hotelRouter.get('/:id', getOneHotel);
hotelRouter.get('/:id/rooms', getRooms); 
hotelRouter.get('/rooms/photos/access', getPhotos);
hotelRouter.get('/', getAllHotels);
hotelRouter.get('/countByCity/number', countByCity);
hotelRouter.get('/countByType/details', countByType);
hotelRouter.get('/count/:hotelId/rooms', roomsCount);
hotelRouter.get('/hotel/:hotelId/rooms', getHotelRooms);
hotelRouter.get('/count/hotels', hotelCount);
hotelRouter.delete('/:id/deleteRooms', deleteRooms);
hotelRouter.delete('/:id', deleteOneHotel);
hotelRouter.delete('/', deleteAllHotels);

// Export Hotel Router
export default hotelRouter;
