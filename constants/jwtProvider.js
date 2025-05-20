import jwt from "jsonwebtoken";

const generateToken = (userID) => {
  const token = jwt.sign({ userID }, process.env.KEY, { expiresIn: "48hr" });
  return token;
};

const getUserIdByToken = (token) => {
  const decodedToken = jwt.verify(token, process.env.KEY);
  return decodedToken.userID;
};

export default {
  generateToken,
  getUserIdByToken,
};
