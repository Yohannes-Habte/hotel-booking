// This function shows the user the error message provided in the backend
// Go to the try catch and then import ErrorMessage function

const ErrorMessage = (error) => {
    return error.response && error.response.data.message
    ? error.response.data.message // Specific error message for a specific data from the backend
    : error.message; // General error message from the backend
};

export default ErrorMessage;


