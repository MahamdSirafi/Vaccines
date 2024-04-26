const AppError = require("./../utils/appError");
const handleCastErrorDB = (err) => {
  const message = `غير صحيح ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  console.log(err);
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `يوجد تكرار في قيمة الحقل: ${value}. الرجاء ادخال قيمة اخرة!`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `خطء في ادخال نوع البيانات. ${errors.join(". ")}`;
  return new AppError(message, 400);
};
const handleJWTError = () =>
  new AppError("رمز التحقق غير صحيح الرجاء اعادة تسجيل الدخول", 401);
const handleJWTExpiredError = () =>
  new AppError("انتهت صلاحية رمز التحقق الرجاء اعادة تسجيل الدخول", 401);
const sendErrorDev = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith("/api")) {
    console.error("ERROR 💥", err);
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // B) RENDERED WEBSITE
  console.error("ERROR 💥", err);
  return res.status(500).json({
    status: "error",
    message: "حدث شيء ما بطريقة خاطئة",
  });
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  let error = { ...err };
  error.message = err.message;
  if (error.name === "CastError") error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === "ValidationError") error = handleValidationErrorDB(error);
  if (error.name === "JsonWebTokenError") error = handleJWTError();
  if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
  sendErrorDev(error, req, res);
};
