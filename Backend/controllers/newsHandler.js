const News = require("../models/newsDataSchema");
const user=require("../models/newsUserSchema")
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const jwt = require("jsonwebtoken");
function isFileTypeSupported(type, supportedType) {
  return supportedType.includes(type);
}

async function uploadToCloudinary(file, folder, quality) {
  const options = { folder };
  options.resource_type = "auto";
  if (quality) {
    options.quality = quality;
  }
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

const createNews = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');


  const newsData = req.body;
  const file = req.files.imgUrl;
  const supportedType = ["jpg", "jpeg", "png"];
  const fileType = file.name.split(".")[1].toLowerCase();

  if (!isFileTypeSupported(fileType, supportedType)) {
    return res.status(400).json({
      success: false,
      message: "File Type not Suported",
    });
  }
  try {
    const response = await uploadToCloudinary(file, "newsMedia");
    newsData.imgUrl = response.url;
    console.log(response);
    const news = await new News(newsData);
    news.save();
    return res
      .status(200)
      .json({
        success: true,
        NewsData: news,
        message: "News Added Successfully",
      });
  } catch (error) {
    console.error("", error);
    return res.status(500).send("Error fetching message data");
  }
};

const adminNews = async (req, res) => {
  try {
    const news = await News.find({ Approved: false });
    console.log(news);
    return res.send(news || []);
  } catch (error) {
    console.error("Error fetching news data:", error);
    return res.status(500).send("Error fetching news data");
  }
};

const adminApprove = async (req, res) => {
  const { id } = req.body;

  try {
    const article = await News.findById(id);
    if (!article) {
      return res.status(404).json({ success: false, message: "Article not found" });
    }

    article.Approved = true;
    await article.save();

    return res.status(200).json({ success: true, message: "Article approved successfully" });
  } catch (error) {
    console.error("Error approving article:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const adminDeny = async (req, res) => {
  const { id } = req.body;
  console.log(id);

  try {
    const article = await News.findById(id);
    if (!article) {
      return res.status(404).json({ success: false, message: "Article not found" });
    }

    const deletedData = await News.findByIdAndDelete(id);
    return res.status(200).json({ success: true, deletedData, message: "Article denied successfully" });
  } catch (error) {
    console.error("Error denying article:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


const newsData = async (req, res) => {
  const token= req.headers['authorization']?.split(" ")[1]
  const user=jwt.verify(token,process.env.JWT_SECRET)
  console.log(user)


  try {
    const news = await News.find({ Owner: user.Email }).sort({ createdAt: -1 });
    res.json(news);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const newsdataall = async (req, res) => {
  try {
    const news1 = await News.find({ Approved: true }).sort({ createdAt: -1 });
    res.json(news1);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const categoryData = async (req, res) => {
  const {category} = req.body;
  console.log(category);
  try {
    const news = await News.find({ Approved: true, Group: category }).sort({ createdAt: -1 });
    res.json(news);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const verifylike = async (req, res) => {
  const newsid=req.body
  if (newsid.currentemail===""){
    console.log("Not signed in")
    res.send("0")

  }
  else{
    
    const news1=await user.find({ Email: newsid.currentemail })
    // console.log(news1[0].newsItems)
  
    if (news1[0].newsItems.includes(newsid.newsid)){
      console.log("already existss")
      res.send("0")
      return
    }
  
    // if (!news1[currentemail].includes(newsid.newsid)){
  
    // }
    const news=await user.updateOne({Email:newsid.currentemail},{ $push: { newsItems: newsid.newsid } })
  
    const result = await News.updateOne(
      { _id: newsid.newsid }, // Filter by document ID
      { $inc: { Like: 1 } } // Set the `Like` field to 1
    );
    res.send("1")

  }
 
};



const reported = async (req, res) => {
  const newsid=req.body
  if (newsid.currentemail===""){
    console.log("Not signed in")
    res.send("0")

  }
  else{
    
    const news2=await user.find({ Email: newsid.currentemail })
  
    if (news2[0].newsItems1.includes(newsid.newsid)){
      console.log("already existss")
      res.send("0")
      return

    }
  
    // if (!news1[currentemail].includes(newsid.newsid)){
  
    // }
    const news=await user.updateOne({Email:newsid.currentemail},{ $push: { newsItems1: newsid.newsid } })

    let defaulter = await News.findOne({ _id: Object(newsid.newsid) });
    if (defaulter.Reported>=1){
      await News.findByIdAndDelete(newsid.newsid)
      console.log("deleted",defaulter.Reported)
    }
    else{
      const result = await News.updateOne(
        { _id: newsid.newsid }, // Filter by document ID
        { $inc: { Reported: 1 } } // Set the `Like` field to 1
      );
      res.send("1")

    }
  
    

  }
 
};

const deletepost=async(req,res)=>{
  const newsid=req.body
  const news3=await News.findByIdAndDelete(newsid.newsid);
  console.log("deleted")
}

module.exports = { createNews, adminNews, adminApprove, adminDeny, newsData, categoryData,newsdataall,verifylike,reported,deletepost };
