// const jwtProvider = require("../constants/jwtProvider");
// const User = require("../models/user.schema");

// const authenticate = async (req, res, next) => {
//   // console.log("hello");
//   try {
//     const token =
//       req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
//     console.log(token);
//     if (!token) {
//       return res.status(400).json("token not found");
//     }
//     const userID = jwtProvider.getUserIdByToken(token);
//     const user = await User.findById(userID).select("-password");
//     if (!user) {
//       throw new Error("user not found");
//     }
//     req.user = user;
//     req.userID = userID;
//     next();
//   } catch (error) {
//     res.status(401).send("Unauthorized:No token provided");
//   }
// };
// module.exports = authenticate;
