const News = require("../models/newsDataSchema");
const cloudinary = require("cloudinary").v2;

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
  try {
    const news = await News.find({ Approved: true }).sort({ createdAt: -1 });
    res.json(news);
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

module.exports = { createNews, adminNews, adminApprove, adminDeny, newsData, categoryData };
