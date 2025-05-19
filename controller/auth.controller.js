import otpGenerator from "otp-generator";
import twilio from "twilio";
import User from "../models/user.schema.js";
import otpVerification from "../constants/otpValidate.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = new twilio(accountSid, authToken);

const sendOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    // console.log(phoneNumber);
    if (!phoneNumber) {
      return res.status(400).json({ msg: "Phone number is required" });
    }
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const cDate = new Date();

    await User.findOneAndUpdate(
      { phoneNumber }, // <--- match the schema field
      { otp, otpExpiration: new Date(cDate.getTime()) }, // <-- also set 'mobile' on insert
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await twilioClient.messages.create({
      body: `Your OTP is :${otp}`,
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    return res.status(200).json({
      success: true,
      msg: otp,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    const otpData = await User.findOne({
      phoneNumber,
      otp,
    });

    if (!otpData) {
      return res.status(400).json({
        success: false,
        msg: "You entered wrong otp",
      });
    }
    const isOtpExpired = await otpVerification(otpData.otpExpiration);

    if (isOtpExpired) {
      return res.status(400).json({
        success: true,
        msg: "Your OTP has been expired",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "OTP verified successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

const registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, msg: "Admin already exists" });
    }
    // console.log(email);
    // hashing the password
    const hashPassword = await bcrypt.hash(password, 8);

    const newAdmin = new User({
      email,
      password: hashPassword,
      role: "admin",
    });
    // console.log(email);

    await newAdmin.save();

    res
      .status(201)
      .json({ success: true, msg: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    //   console.log(user);
    if (!user || user.role !== "admin") {
      return res
        .status(401)
        .json({ success: false, msg: "You are not an admin" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });
    }

    // console.log(email);
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_KEY,
      {
        expiresIn: "1d",
      }
    );
    // console.log(token);

    return res.status(200).json({
      success: true,
      msg: "Admin login successful",
      token,
    });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

// module.exports = { verifyOtp, sendOtp, loginAdmin, registerAdmin };

export {
  verifyOtp,
  sendOtp,
  loginAdmin,
  registerAdmin
};