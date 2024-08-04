import { check } from 'express-validator';

const registerValidator = () => {
  return [
    check('firstName')
      .trim()
      .escape()
      .isLength({ min: 2, max: 12 })
      .withMessage('First name must be between 2 and 12 characters'),

    check('lastName')
      .trim()
      .escape()
      .isLength({ min: 2, max: 12 })
      .withMessage('Last name must be between 2 and 12 characters'),

    check('email').normalizeEmail().isEmail().withMessage('Email is not valid'),

    check('password')
      .isStrongPassword()
      .withMessage(
        'Password must be at least 8 characters long and contain at least one number, one uppercase letter, and one special character'
      ),

    check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }

      return true;
    }),

    check('phone')
      .trim()
      .escape()
      .isNumeric()
      .withMessage('Invalid phone number!'),

    check('city')
      .trim()
      .escape()
      .isLength({ min: 2, max: 15 })
      .withMessage('City name must be between 2 and 15 characters'),

    check('country')
      .trim()
      .escape()
      .isLength({ min: 2, max: 15 })
      .withMessage('Country name must be between 2 and 15 characters'),
  ];
};

export default registerValidator;
