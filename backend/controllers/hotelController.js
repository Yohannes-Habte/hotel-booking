import Hotel from '../models/hotelModel.js';
import Room from '../models/roomModel.js';
import createError from 'http-errors';

// Creete Hotel
export const createHotel = async (req, res, next) => {
  const createHotel = new Hotel(req.body);
  try {
    const saveHotel = await createHotel.save();
    res.status(201).json(saveHotel);
  } catch (error) {
    console.log(error);
    next(createError(400, 'Hotel is not created! Please try again!'));
  }
};

// Update Hotel details
export const updateHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json(hotel);
  } catch (error) {
    console.log(error);
    return next(createError(500, 'Booked Hotel could not be updated'));
  }
};

// Get one hotel
export const getOneHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    res.status(200).json(hotel);
  } catch (error) {
    console.log(error);
    return next(
      createError(500, 'The Hotel could not be accessed. Please try again!')
    );
  }
};

// Get all rooms photos
export const getPhotos = async (req, res, next) => {};

//! Get all hotels using query and limit
export const getAllHotels = async (req, res, next) => {
  // Get all hotels between min and max prices
  const { min, max, ...others } = req.query;
  // Sort hotels using the cheapestPrice
  const sorting = { cheapestPrice: 1 };
  // Limit the number of hotels based on cheapestPrice
  const dynamicLimit = req.query.limit;
  const limit = 4;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 9999 },
    })
      .limit(limit)
      .sort(sorting);
    /** 
    - const hotels = await Hotel.find(req.query).limit(req.query.limit);
    - http://localhost:9900/hotels?featured=true&limit=4 => limit is described by "&limit=4". The number after = is dynamic
    - Max and min query is: http://localhost:9900/hotels?featured=true&limit=2&min=10&max=200
    - limit(req.query.limit) is dynamic
    */
    return res.status(200).json(hotels);
  } catch (err) {
    console.log(err);
    return next(
      createError(
        500,
        'There is a problem in fetch specific hotel data! Please try again:'
      )
    );
  }
};

// Get counts of all hotels
export const hotelCount = async (req, res, next) => {
  try {
    const count = await Hotel.countDocuments();

    res.status(200).json(count);
  } catch (error) {
    console.log(error);
    return next(
      createError(500, 'The Hotels could not be accessed. Please try again!')
    );
  }
};

// Get All Rooms for a single hotel
export const getRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel.rooms);
  } catch (error) {
    console.log(error);
    next(createError(400, 'Rooms coud not be accessed! Please try again!'));
  }
};

// Get the number of all the rooms for a single hotel
export const roomsCount = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    const hotel = await Hotel.findById(hotelId);
    res.status(200).json(hotel.rooms.length);
  } catch (error) {
    console.log(error);
    next(
      createError(
        400,
        `The number of rooms coud not be accessed! Please try again!`
      )
    );
  }
};

// Get the number of all hotels by city
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(','); // cities will be in array format
  try {
    // We use "Promis.all" becasue of waiting for multiple items (three cities)
    const citiesList = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
        //return Hotel.find({ city: city }).length;
      })
    );
    return res.status(200).json(citiesList);
  } catch (err) {
    console.log(err);
    return next(
      createError(
        500,
        'The numbe of hotels by city could not be accessed. Please try again!'
      )
    );
  }
};

// Get the number of all hotels by type
export const countByType = async (req, res, next) => {
  // You can use query using promiseAll or listing all hotel types. In this case, listing all hotel types is used
  try {
    const hotelCount = await Hotel.countDocuments({ type: 'Hotel' });
    const apartmentCount = await Hotel.countDocuments({ type: 'Apartment' });
    const resortCount = await Hotel.countDocuments({ type: 'Resort' });
    const hostelCount = await Hotel.countDocuments({ type: 'Hostel' });
    const cabinCount = await Hotel.countDocuments({ type: 'Cabin' });
    const villaCount = await Hotel.countDocuments({ type: 'Villa' });

    return res.status(200).json([
      {
        type: 'Hotel',
        count: hotelCount,
        image: 'http://localhost:9900/4starHotel.jpg',
      },
      {
        type: 'Apartment',
        count: apartmentCount,
        image: 'http://localhost:9900/hotel2.jpg',
      },
      {
        type: 'Resort',
        count: resortCount,
        image: 'http://localhost:9900/5beachHotel.jpg',
      },
      {
        type: 'Villa',
        count: villaCount,
        image: 'http://localhost:9900/hotel3.jpg',
      },
      {
        type: 'Cabin',
        count: cabinCount,
        image: 'http://localhost:9900/3starHotel.jpg',
      },
      {
        type: 'Hostel',
        count: hostelCount,
        image: 'http://localhost:9900/lisaHotel.jpg',
      },
    ]);
  } catch (err) {
    console.log(err);
    return next(
      createError(500, "Count by type couldn't be queried. Please try again!")
    );
  }
};

// Get hotel room
export const getHotelRooms = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    const hotel = await Hotel.findById(hotelId);
    // Sincer there are multiple rooms, promise all is used
    const rooms = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );

    return res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
  }
};

// Delete one hotel
export const deleteOneHotel = async (req, res, next) => {
  try {
    const foundHotel = await Hotel.findById(req.params.id);
    await Hotel.findByIdAndDelete(req.params.id);

    res.status(200).json(`${foundHotel.name} has been successfuly deleted`);
  } catch (error) {
    console.log(error);
    return next(
      createError(500, 'The Hotel could not be deleted. Please try again!')
    );
  }
};

// Delete all hotels
export const deleteAllHotels = async (req, res, next) => {
  try {
    await Hotel.deleteMany();

    res.status(200).json('The Hotels have been successfuly deleted');
  } catch (error) {
    console.log(error);
    return next(
      createError(500, 'The Hotels could not be deleted. Please try again!')
    );
  }
};

//! Delete All Rooms for a specific hotel
export const deleteRooms = async (req, res, next) => {
  const hotelId = req.params.id;
  try {
    const hotel = await Hotel.findById(hotelId);

    // Find the hotel where you want to delete all its rooms

    await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: [] } });

    return res
      .status(200)
      .json(`The rooms of ${hotel.rooms} have been successfully deleted!`);
  } catch (error) {
    console.log(error);
  }
};
