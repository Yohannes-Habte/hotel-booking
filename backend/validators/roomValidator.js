import { check } from 'express-validator';

const roomValidator = () => {
  return [
    check('title')
      .trim()
      .escape()
      .isLength({ min: 2, max: 30 })
      .withMessage('Title must be between 2 and 30 characters'),

    check('maxPeople')
      .trim()
      .escape()
      .isNumeric()
      .isLength({ min: 1 })
      .withMessage('Minimum people size is one perseon'),

    check('price')
      .trim()
      .escape()
      .isNumeric()
      .isLength({ min: 2 })
      .withMessage('Minimum price is greater than 30 Euro'),

    check('description')
      .trim()
      .escape()
      .isNumeric()
      .isLength({ min: 30 })
      .withMessage('Minimum description requires at least 30 characters.'),
  ];
};

export default roomValidator;
