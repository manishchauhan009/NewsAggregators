require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1] || req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access Denied. No Token Provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verified)
    req.user = verified;
    console.log(verified)
    next();
  } catch (error) {
    console.log("Auth Error")
    res.status(400).json({ success: false, message: "Invalid Token" });
  }
};

const isAdmin = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1] || req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access Denied. No Token Provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are Not Allowed to Access Protected Route",
        });
    }
    next();
  } catch (error) {
    console.error("Error during token verification:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { isAdmin, authMiddleware };
