const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "الرجاء ادخال اسم المستخدم"],
      trim: true,
    },
    card_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Card",
      select: function () {
        return this.role == "user" ? true : false;
      },
    },

    photo: {
      type: String,
      default: "http://localhost:9000/img/user-icon.jpg",
    },
    role: {
      type: String,
      enum: ["user", "mgr", "nurse", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "الرجاء ادخال كلمة المرور"],
      minlength: 8,
      select: false,
      trim: true,
      default: 11111111,
    },
    phone_number: {
      type: String,
      required: [true, "الرجاء ادخال رقم الهاتف"],
      unique: true,
      validate: {
        validator: function (el) {
          return /(\+963[345689]\d{8}|09[345689]\d{7})/.test(el);
        },
        message: "ادخال رقم هاتف صالح",
      },
    },
    center: {
      type: mongoose.Schema.ObjectId,
      ref: "Center",
      select: function () {
        return this.role == "nurse" || this.role == "mgr" ? true : false;
      },
    },

    address: {
      type: String,
      select: function () {
        return this.role == "nurse" || this.role == "mgr" ? true : false;
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false }
);
userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
