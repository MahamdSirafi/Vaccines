const AppError = require('./../utils/appError');
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// const handleDuplicateFieldsDB = (err) => {
//   const matchResult = err.message.match(/(["'])(\\?.)*?\1/);
//   const value = matchResult ? matchResult[0] : "";
//   const message = `Duplicate field value: ${value}. Please use another value!`;
//   return new AppError(message, 400);
// };
// const handleDuplicateFieldsDB = (err) => {
//   const matchResult = err.message.match(/(["'])(\\?.)*?\1/);
//   const value = matchResult ? matchResult[0] : "";
  
//   if (value.length > 0) {
//     const message = `Duplicate field value: ${value}. Please use another value!`;
//     return new AppError(message, 400);
//   } else {
//     const message = 'Duplicate field value detected. Please use another value!';
//     return new AppError(message, 400);
//   }
// };
const handleDuplicateFieldsDB = (err) => {
  console.log(err);
    const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);

  // التعامل مع حالة أخرى إذا لم يكن هناك خطأ مطابق للنمط المحدد
  // return أو throw للحالة المناسبة
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};
const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);
const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);
const sendErrorDev = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    console.error('ERROR 💥', err);
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // B) RENDERED WEBSITE
  console.error('ERROR 💥', err);
  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  let error = { ...err };
  error.message = err.message;
  if (error.name === 'CastError') error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
  if (error.name === 'JsonWebTokenError') error = handleJWTError();
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
  sendErrorDev(error, req, res);
};
