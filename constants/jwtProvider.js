import jwt from "jsonwebtoken";

const generateToken = (userID) => {
  const token = jwt.sign({ userID }, process.env.JWT_KEY, { expiresIn: "48hr" });
  return token;
};

const getUserIdByToken = (token) => {
  const decodedToken = jwt.verify(token, secrey_key);
  return decodedToken.userID;
};

export default {
  generateToken,
  getUserIdByToken,
};
