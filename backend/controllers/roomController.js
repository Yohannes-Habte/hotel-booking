import Hotel from '../models/hotelModel.js';
import Room from '../models/roomModel.js';
import createError from 'http-errors';

// Creete Room for specific hotel
export const createRoom = async (req, res, next) => {
  // For which hotel do you want to create a room? So find the hotel first, then create the room!
  const hotelId = req.params.hotelId;
  const createRoom = new Room(req.body);
  try {
    const saveRoom = await createRoom.save();

    // Now, you need to update the hotel
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: saveRoom._id },
      });
    } catch (err) {
      console.log(err);
      return next(createError(500, 'The hotel could not be updated'));
    }

    return res.status(200).json(saveRoom);
  } catch (error) {
    console.log(error);
    next(createError(400, 'Room coud not be created! Please try again!'));
  }
};

// Update Room
export const updateRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.status(200).json(room);
  } catch (error) {
    console.log(error);
    next(createError(400, 'Room coud not be updated! Please try again!'));
  }
};

// Update the availability of rooms in the roomNumbers
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { 'roomNumbers._id': req.params.id },
      { $push: { 'roomNumbers.$.unavailableDates': req.body.dates } }
    );
    res.status(200).json("Room status has been updated!")
  } catch (error) {
    console.log(error);
    next(createError(400, 'Room could not be updated! Please try again!'));
  }
};

// Get One Room
export const getONeRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    console.log(error);
    next(createError(400, 'Room coud not be accessed! Please try again!'));
  }
};

// Get All Rooms for all hotels
export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
    next(createError(400, 'Rooms coud not be accessed! Please try again!'));
  }
};

// Get Counts of all Rooms
export const roomsCount = async (req, res, next) => {
  try {
    const count = await Room.countDocuments();
    res.status(200).json(count);
  } catch (error) {
    console.log(error);
    next(
      createError(
        400,
        'Number of rooms could not be accessed! Please try again!'
      )
    );
  }
};

// Delete One Room from a specific hotel
export const deleteOneRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const roomId = req.params.id;
  try {
    await Room.findByIdAndDelete(roomId);

    try {
      await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: roomId } });
    } catch (err) {
      console.log(err);
      return next(
        createError(500, 'The room did not delete. Please try again!')
      );
    }
    return res.status(200).json(`Room has been successfully deleted`);
  } catch (err) {
    console.log(err);
    return next(createError(500, 'Room could not be deleted'));
  }
};

// Delete All Rooms from all hotels
export const deleteAllRooms = async (req, res, next) => {
  try {
    await Room.deleteMany();
    res.status(200).json('All rooms have been successfuly deleted!');
  } catch (error) {
    console.log(error);
    next(createError(400, 'Rooms coud not be deleted! Please try again!'));
  }
};
