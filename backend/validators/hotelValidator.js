import { check } from 'express-validator';

const hotelValidator = () => {
  return [
    check('name')
      .trim()
      .escape()
      .isLength({ min: 2, max: 30 })
      .withMessage('Name must be between 2 and 30 characters'),

    check('type')
      .trim()
      .escape()
      .isLength({ min: 2, max: 30 })
      .withMessage('Type must be between 2 and 30 characters'),

    check('city')
      .trim()
      .escape()
      .isLength({ min: 2, max: 30 })
      .withMessage('City must be between 2 and 30 characters'),

    check('address')
      .trim()
      .escape()
      .isLength({ min: 2, max: 30 })
      .withMessage('Address must be between 2 and 30 characters'),

    check('distance')
      .trim()
      .escape()
      .isLength({ min: 3, max: 10 })
      .withMessage('Address must be between 3 and 10 characters'),

    check('title')
      .trim()
      .escape()
      .isLength({ min: 3, max: 30 })
      .withMessage('Address must be between 3 and 30 characters'),

    check('title')
      .trim()
      .escape()
      .isLength({ min: 3, max: 30 })
      .withMessage('Address must be between 3 and 30 characters'),

    check('description')
      .trim()
      .escape()
      .isLength({ min: 30 })
      .withMessage('Minimum description requires at least 30 characters.'),

    check('rating')
      .trim()
      .escape()
      .isNumeric({ min: 0, max: 5 })
      .withMessage('Rating is between 0 & 6.'),

    check('price')
      .trim()
      .escape()
      .isNumeric()
      .isLength({ min: 2 })
      .withMessage('Minimum price is greater than 30 Euro'),

    check('cheapestPrice')
      .trim()
      .escape()
      .isNumeric({ min: 30 })
      .withMessage('Cheapest price is 30 Euros.'),
  ];
};

export default hotelValidator;
