import jwt from "jsonwebtoken";

const isAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ success: false, msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("token", token);

  try {
    const decoded = jwt.verify(token, process.env.admin_key);
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, msg: "Forbidden: Not an admin" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, msg: "Invalid token" });
  }
};

export default isAdmin;
