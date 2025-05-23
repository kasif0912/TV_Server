import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
      required: true,
      enum: ["Basic", "Premium", "Standard", "Gold"], // You can adjust or remove this if names are dynamic
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    validTill: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["active", "expired"],
      default: "active",
    },
    deviceType: {
      type: [String],
      enum: ["mobile", "laptop", "tablet", "tv"],
      required: true,
    },
    paymentId: {
      type: String,
    }, // razorpay_payment_id
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
