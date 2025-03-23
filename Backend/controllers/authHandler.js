const User = require("../models/newsUserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function isValidGmail(email) {
  // Regular expression to validate Gmail addresses
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return gmailRegex.test(email);
}

const register = async (req, res) => {
  const userData = req.body;
  let hashedPassword;

  try {
    if (isValidGmail(userData.Email)) {
      
      const existingUser = await User.findOne({ Email: userData.Email });
      if (existingUser) {
        console.log("exist")
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      } else {
        hashedPassword = await bcrypt.hash(userData.Password, 10);
        userData.Password = hashedPassword;
        const newUser = new User(userData);
        await newUser.save();
        return res.status(200).json({ success: true, message: "User Registered Successfully" });
      }
    } else {
      console.log("Invalid email")
      return res.status(403).json({ success: false, message: "Invalid Email" });
    }
  } catch (error) {
    console.error("Error adding new user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const userData = req.body;
  if (isValidGmail(userData.Email)) {
    try {
      const user = await User.findOne({ Email: userData.Email });
      if (user && (await bcrypt.compare(userData.Password, user.Password))) {
        const token = jwt.sign(
          {
            id: user._id,
            Email: user.Email,
            Password: user.Password,
            role: user.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 72 * 60 * 60 * 1000,
        }); // 3 days
        return res
          .status(200)
          .json({
            success: true,
            token: token,
            message: "User Logged in Successfully",
          });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Incorrect Email or Password" });
      }
    } catch (error) {
      console.error("Error checking user credentials:", error);
      return res
        .status(500)
        .send("Error Checking User Credentials. Please Try Again Later");
    }
  }
  else{
    console.log("error")
    return res
    .status(800)
    .send("Error Checking User Credentials. Please Try Again Later");
  }
};

const adminRegister = async (req, res) => {
  const userData = req.body;
  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(userData.Password, 10);
    userData.Password = hashedPassword;
    userData.role = "admin";
    const newUser = new User(userData);
    await newUser.save();
    return res
      .status(200)
      .json({ success: true, message: "Admin Registered Successfully" });
  } catch (error) {
    console.error("Error Registering Admin:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const adminLogin = async (req, res) => {
  try {
    // const user = await User.findOne({ Email: userData.Email, role: 'admin' });
    // if (user && await bcrypt.compare(userData.Password, user.Password)) {
    // const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    // res.cookie("token", token, { httpOnly: true, maxAge: 72 * 60 * 60 * 1000 }); // 3 days
    // return res.status(200).json({ success: true, token:token, message: "Admin Logged in Successfully" });
    // } else {
    //   return res.status(400).json({ success: false, message: "" });
    // }

    const data = await User.find({ Approved: false });
    // res.send(data);
    return res
      .status(200)
      .json({ success: true, message: "Admin Logged in Successfully" });
  } catch (error) {
    console.error("Error during admin login:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { register, login, adminLogin, adminRegister };
