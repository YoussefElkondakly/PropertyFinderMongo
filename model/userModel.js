const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    minlength: [11, "Please Type a Correct Phone Number"],
    maxlength: [11, "Please Type a Correct Phone Number"],
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: "client",
    enum: {
      values: ["client", "agent"],
      message: "The Roles Must Be Either Client or Agent",
    },
  },
  photo: String,
  password: {
    type: String,
    required: true,
    minLength: [8, "The Password Field Must Be at Least 8 Characters"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "The Passwords Do Not Match",
    },
  },
  status: {
    type: Boolean,
    default: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  verifyUserToken: String,
});
userSchema.methods.checkChangedPassword = function (jwtIat) {
  console.log("Hi");
  if (this.passwordChangedAt) {
    const changedPasswordTime = this.passwordChangedAt.getTime() / 1000;
    console.log(changedPasswordTime, jwtIat);
    console.log(jwtIat < changedPasswordTime);
    return jwtIat < changedPasswordTime;
  }
  return false;
};
userSchema.methods.createToken = function (type) {
  if (type === "reset") {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256") //
      .update(resetToken) //
      .digest("hex"); //
    // console.log({ resetToken }, this.passwordResetToken);
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
  }
  if (type === "verify") {
    const verifyToken = crypto.randomBytes(32).toString("hex");
    this.verifyUserToken = crypto
      .createHash("sha256") //
      .update(verifyToken) //
      .digest("hex");
    //

    return verifyToken;
  }
};
userSchema.methods.checkPassword = async function (givenPass, documentPass) {
  console.log(this);
  return await bcrypt.compare(givenPass, documentPass);
};

userSchema.pre("save", async function (next) {
  console.log(!this.isModified("password"));
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});
userSchema.pre("save", function (next) {
  console.log(!this.isModified("password") || this.isNew);
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
