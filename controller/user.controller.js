import User from "../models/userSchema/user.schema.js"; // adjust path if needed

const getAllUsersWithSubscriptions = async (req, res) => {
  try {
    const users = await User.find().populate("subscription");

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export { getAllUsersWithSubscriptions };
