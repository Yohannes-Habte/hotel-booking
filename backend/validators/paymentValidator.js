import { check } from 'express-validator';

const paymentValidator = () => {
  return [
    check('paymentMethod')
      .isIn(['Visa', 'MasterCard', 'American Express', 'Discover'])
      .withMessage(
        'Payment method must be Visa, MasterCard, American Express or Discover'
      ),

    check('cardNumber')
      .isCreditCard()
      .isDbitCart()
      .trim()
      .escape()
      .withMessage('Card number is not valid'),

    check('cardExpiry')
      .isISO8601()
      .trim()
      .escape()
      .isLength({ max: 10 })
      .withMessage('Card expiry is not valid'),

    check('cardCVC')
      .isNumeric()
      .trim()
      .escape()
      .withMessage('Card CVC is not valid'),
  ];
};

export default paymentValidator;
