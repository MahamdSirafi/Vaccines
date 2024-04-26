const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const crypto = require("crypto");
const Card = require("../models/cardModel");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
  // Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  if (req.body.role === ("admin" || "mgr" || "nurse"))
    return next(
      new AppError("ممنوع استدخدام انشاء الحساب لغير المستخدمين", 403)
    );
  const card = await Card.findOne({ card_id: req.body.card_id });
  req.body.card_id = card._id;
  const newUser = await User.create(req.body);
  createSendToken(newUser, 201, req, res);
});
exports.login = catchAsync(async (req, res, next) => {
  const { phone_number, password } = req.body;
  // 1) Check if email and password exist
  if (!phone_number || !password) {
    return next(new AppError("الرجاء التحقق من كلمة السر او رقم الهاتف", 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ phone_number }).select("+password");
  if (!user) {
    return next(new AppError("رقم الهاتف غير موجود", 401));
  }
  if (!(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect password", 401));
  }
  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});
exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

//password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ phone_number: req.body.phone_number });
  if (!user) {
    return next(new AppError("لا يوجد مستخدم يمتلك هذا رقم الهاتف", 404));
  }
  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // 3) Send it to user's email
  try {
    const resetURL = `${req.protocol}://${req.get("host")}${req.originalUrl
      .split("/", 4)
      .join("/")}/resetPassword/${resetToken}`;
    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
      url: resetURL,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError("يوجد مشكلة في ارسال الرمز الى رقم الهاتف"),
      500
    );
  }
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("لقد انتهت صلاحية الرمز او الرمز خاطء", 400));
  }
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, req, res);
});
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");
  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("كلمة السر الحالية غير صحيحة", 401));
  }
  // 3) If so, update password
  user.password = req.body.password;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!
  // 4) Log user in, send JWT
  createSendToken(user, 200, req, res);
});
