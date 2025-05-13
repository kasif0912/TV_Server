const USER = require("../models/user.schema");
const otpGenerator = require("otp-generator");
const twilio = require("twilio");
const OTPLogin = require("../models/user.schema");
const { otpVerification } = require("../constants/otpValidate");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = new twilio(accountSid, authToken);

const sendOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    // console.log(phoneNumber);

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const cDate = new Date();

    await OTPLogin.findOneAndUpdate(
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
    const otpData = await OTPLogin.findOne({
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
      msg: "OTP verified Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const validUser = await USER.findOne({ _id: req.userID });
    if (!validUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(validUser);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
    console.error(error);
  }
};

module.exports = { verifyOtp, getUser, sendOtp };
