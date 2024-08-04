import User from '../models/userModel.js';
import createError from 'http-errors';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middlewares/verification.js';

// Register new user
export const registerUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    image,
    phone,
    city,
    country,
    isAdmin,
  } = req.body;
  try {
    const foundUser = await User.findOne({ email: email });

    if (foundUser) {
      return next(
        createError(
          400,
          'The e-mail address is already taken. Please try another email!'
        )
      );
    }

    if (!foundUser) {
      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        image: image,
        phone: phone,
        city: city,
        country: country,
        isAdmin: isAdmin,
      });

      // Save user in the database
      const user = await newUser.save();

      // Generate user token
      const token = generateToken(user.id);

      // Send HTTP-only cookie to the client in the frontend and also the user data
      return res
        .cookie('access_token', token, {
          httpOnly: true,
          expiresIn: '1h',
          sameSite: 'none',
          secure: true,
        })
        .status(201)
        .json({ user });
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'You could not sign up! Please try again'));
  }
};

// Login user
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return next(createError(400, 'Email does not exist. Please signup!'));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(createError(400, 'Incorrect password!'));
    }

    if (user && isPasswordValid) {
      // To prevent password and adming sending to the frontend, you can do ....
      const { password, isAdmin, ...userDetails } = user._doc;

      // Generate user token
      const token = generateToken(user.id);

      // Send HTTP-only cookie to the client in the frontend and also the user data
      return res
        .cookie('access_token', token, {
          httpOnly: true,
          expiresIn: '1h',
          sameSite: 'none',
          secure: true,
        })
        .status(201)
        .json({ details: { ...userDetails }, isAdmin });
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'You could not sign in! Please try again'));
  }
};

// Update User
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

// Get single User
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

// Get All Users
export const getUsers = async (req, res, next) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            //search user with "name" or "email"
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } },
          ],
        }
      : {}; // else you do nothing
    const users = await User.find(keyword);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

// Count All Users
export const countUsers = async (req, res, next) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json(count);
  } catch (error) {
    console.log(error);
  }
};

// Delete single User
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been successfully deleted: Welcome back!');
  } catch (error) {
    console.log(error);
  }
};

// Delete All Users
export const deleteUsers = async (req, res, next) => {
  try {
    await User.deleteMany();
    res.status(200).json('All users have been successfully deleted!');
  } catch (error) {
    console.log(error);
  }
};
