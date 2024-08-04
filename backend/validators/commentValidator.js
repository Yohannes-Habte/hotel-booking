import { check } from 'express-validator';
const commentValidator = () => {
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

    check('email')
      .normalizeEmail()
      .isEmail()
      .trim()
      .withMessage('Email is not valid'),

    check('message')
      .trim()
      .escape()
      .isLength({ min: 30 })
      .withMessage('Minimum message required is at least 30 characters.'),
  ];
};

export default commentValidator;
