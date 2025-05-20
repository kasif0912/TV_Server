import jwtProvider from "../constants/jwtProvider.js";
import User from "../models/userSchema/user.schema.js";

const authenticate = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(400).json("token not found");
    }
    const userID = jwtProvider.getUserIdByToken(token);
    const user = await User.findById(userID);
    if (!user) {
      throw new Error("user not found");
    }
    req.user = user;
    req.userID = userID;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized:No token provided");
  }
};

export default authenticate;
