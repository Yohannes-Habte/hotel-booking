import { data } from '../data.js';
import createError from 'http-errors';

// Get all rooms page photos
export const photos = async (req, res, next) => {
  const bedrooms = data.roomsData;
  if (bedrooms) {
    res.status(200).send(bedrooms);
  } else {
    next(createError(500, 'Rooms could not be accessed. Please try again!'));
  }
};

// Get Header component data
export const getHeader = async (req, res, next) => {
  const hotel = data.HeaderData;
  if (hotel) {
    res.status(200).send(hotel);
  } else {
    next(
      createError(500, 'Hotel image could not be accessed. Please try again!')
    );
  }
};

// Get Footer component data
export const getFooter = async (req, res, next) => {
  const footerInfo = data.roomsData;
  if (footerInfo) {
    res.status(200).send(data.FooterData);
  } else {
    next(createError(500, 'Footer data could not be accessed. Please try again!'));
  }
};

// Get About page data
export const getHotels = async (req, res, next) => {
  const cityHotel = data.hotels;
  try {
    if (cityHotel) {
      return res.status(200).json(cityHotel);
    } else {
      res.status(400).send('City hotels not found!');
    }
  } catch (error) {
    console.log(error);
    next(createError(400, 'Hotels not found!'));
  }
};

// Get About page data
export const getAbout = async (req, res, next) => {
  const about = data.roomsData;
  if (about) {
    res.status(200).send(data.AboutData);
  } else {
    next(createError(500, 'Rooms could not be accessed. Please try again!'));
  }
};
