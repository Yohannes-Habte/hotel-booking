const globalErrorHandler = (err, req, res, next) => {
  const errorMessage = err.message || 'Something went wrong!';
  const errorStatusCode = err.status || 500;

  return res.status(errorStatusCode).json({
    success: false,
    status: errorStatusCode,
    message: errorMessage,
    stack: err.stack,
  });
};

export default globalErrorHandler;
