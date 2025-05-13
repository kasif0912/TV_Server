// const jwt = require("jsonwebtoken");
// const secrey_key = process.env.KEY;

// const generateToken = (userID) => {
//   const token = jwt.sign({ userID }, secrey_key, { expiresIn: "48hr" });
//   return token;
// };

// const getUserIdByToken =  (token) => {
//   const decodedToken =  jwt.verify(token, secrey_key);
//   // console.log(decodedToken.userId);
//   return decodedToken.userID;
// };

// module.exports = { generateToken, getUserIdByToken };
