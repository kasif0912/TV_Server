import User from "../models/userSchema/user.schema.js";
import razorpay from "../config/razorpay.config.js";
import crypto from "crypto";
import moment from "moment";
import subscriptionPlans from '../constants/subscription_plans.js'

const createOrder = async (req, res) => {
  const { planKey } = req.body; // 'basic', 'standard', etc.
  const user = req.user;

  const plan = subscriptionPlans[planKey];
  if (!plan) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid subscription plan." });
  }

  try {
    const options = {
      amount: plan.amount * 100, // Razorpay accepts amount in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      planName: plan.name,
      durationMonths: plan.durationMonths,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    planKey,
  } = req.body;
  const userId = req.user;

  const plan = subscriptionPlans[planKey];
  if (!plan) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid subscription plan." });
  }

  try {
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const validTill = moment().add(plan.durationMonths, "months").toDate();

    user.subscription = {
      plan: plan.name,
      paymentId: razorpay_payment_id,
      validTill,
      status: "active",
    };

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified and subscription activated.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

export { createOrder, verifyPayment };
