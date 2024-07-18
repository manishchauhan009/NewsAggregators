const express = require("express");
const { createNews, adminNews, newsData, adminApprove, adminDeny, categoryData } = require("../controllers/newsHandler");
const { authMiddleware} = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/createNews", authMiddleware,createNews);
router.get('/newsData',authMiddleware, newsData);
router.get("/admin/news", adminNews);
router.post('/admin/approve', adminApprove);
router.post('/admin/deny', adminDeny);
router.post('/categoryData',authMiddleware, categoryData);

module.exports = router;