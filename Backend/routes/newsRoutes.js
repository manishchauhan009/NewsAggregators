const express = require("express");
const { createNews, adminNews, newsData, adminApprove, adminDeny, categoryData } = require("../controllers/newsHandler");
const router = express.Router();
router.post("/createNews", createNews);
router.get('/newsData', newsData);
router.get("/admin/news", adminNews);
router.post('/admin/approve', adminApprove);
router.post('/admin/deny', adminDeny);
router.post('/categoryData', categoryData);

module.exports = router;