const express = require("express");
const { createNews, adminNews, newsData, adminApprove, adminDeny, categoryData,newsdataall } = require("../controllers/newsHandler");
const { authMiddleware} = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/createNews", authMiddleware,createNews);
router.get('/ownernewsData',authMiddleware, newsData);

router.get('/approvednewsData',newsdataall)
router.get("/admin/news", adminNews);
router.post('/admin/approve', adminApprove);
router.post('/admin/deny', adminDeny);
router.post('/categoryData',authMiddleware, categoryData);

module.exports = router;

