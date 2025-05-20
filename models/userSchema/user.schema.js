import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      unique: true,
      trim: true,
    },
    otp: {
      type: String,
    },
    otpExpiration: {
      type: Date,
      default: Date.now,
      get: (otpExpiration) => otpExpiration.getTime(),
      set: (otpExpiration) => new Date(otpExpiration),
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    customerId: {
      type: String,
      default: null,
    },
    subscription: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Subscription"
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
