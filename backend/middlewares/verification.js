import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../models/userModel.js';

//=======================================================
// Generate token
//=======================================================
export const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_PASSWORD,
    {
      expiresIn: '1d',
    }
  );
  return token;
};

// Methode 1
//=======================================================
// user account change can be done by the owner or admin
//=======================================================

export const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return next(createError(401, 'User is not authonticated! Please login!'));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_PASSWORD);
    console.log('User is =', decodedToken);
    const user = await User.findById(decodedToken.id);
    if (user.id === req.params.id || user.isAdmin) {
      return next();
    } else {
      return next(createError(403, 'User not found!'));
    }
  } catch (error) {
    console.log(error);
    next(createError(403, 'User could not be authorized. Please try again'));
  }
};

//===========================================================================
// Is user a admin? Admin adds and deletes hotels and rooms as well as users
//===========================================================================
export const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return next(createError(401, 'User is not authonticated! Please login!'));
    }

    // If token exist, decode it
    const decodedToken = jwt.verify(token, process.env.JWT_PASSWORD);
    // Find user from the database
    const user = await User.findById(decodedToken.id);
    if (user.id === req.params.id || user.isAdmin) {
      next();
    } else {
      return next(createError(403, 'User is not authorized!'));
    }
  } catch (error) {
    console.log(error);
    next(createError(403, 'User is not authorized!'));
  }
};
