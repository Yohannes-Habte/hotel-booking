import { check } from 'express-validator';

// Function to validate the required fields for all forms

const requiredValues = (props) => {
  let checkFields = [];
  props.forEach((field) => {
    checkFields.push(
      check(field).notEmpty().withMessage(`${field} is required`)
    );
  });

  return checkFields;
};

export default requiredValues;
