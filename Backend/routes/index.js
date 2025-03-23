const express = require("express");
const newsRoutes = require("./newsRoutes");
const userRoutes = require("./userRoutes");

const router = express.Router();

router.use("/news", newsRoutes);
router.use("/user", userRoutes);

module.exports = router;
