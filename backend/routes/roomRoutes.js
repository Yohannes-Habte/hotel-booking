import express from 'express';
import {
  createRoom,
  deleteAllRooms,
  deleteOneRoom,
  getAllRooms,
  getONeRoom,
  roomsCount,
  updateRoom,
  updateRoomAvailability,
} from '../controllers/roomController.js';
import requiredValues from '../validators/requiredValues.js';
import roomValidator from '../validators/roomValidator.js';
import checkValidation from '../validators/checkValidation.js';

// Room Router
const roomRouter = express.Router();

// Room Routes

roomRouter.post(
  '/:hotelId/createRoom',
  requiredValues(['title', 'maxPeople', 'price', 'description']),
  roomValidator(),
  checkValidation,
  createRoom
);
roomRouter.put('/updateRoom/:id', updateRoom);
roomRouter.put('/availability/:id', updateRoomAvailability);
roomRouter.get('/:id', getONeRoom);
roomRouter.get('/', getAllRooms);
roomRouter.get('/count/allRooms', roomsCount);
roomRouter.delete('/:hotelId/:id', deleteOneRoom);
roomRouter.delete('/', deleteAllRooms);

// Export Room Router
export default roomRouter;
