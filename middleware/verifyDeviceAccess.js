import User from "../models/userSchema/user.schema.js";
import { detectDeviceType } from "./detectDeviceType.js";

export const verifyDeviceAccess = async (req, res, next) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId).populate("subscription");

    if (!user || !user.subscription) {
      return res.status(403).json({ message: "No active subscription." });
    }

    const allowedDevices = user.subscription.deviceType;
    const currentDevice = detectDeviceType(req);

    if (!allowedDevices.includes(currentDevice)) {
      return res
        .status(403)
        .json({ message: `Access denied on ${currentDevice}` });
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
};
