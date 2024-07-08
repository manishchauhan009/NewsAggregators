// Importing the Cloudinary module and accessing its version 2 API
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Function to configure and connect to Cloudinary
exports.cloudinaryConnect = () => {
  try {
    // Configuring Cloudinary with credentials from environment variables
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME, // Cloudinary cloud name from .env file
      api_key: process.env.API_KEY,       // Cloudinary API key from .env file
      api_secret: process.env.API_SECRET  // Cloudinary API secret from .env file
    });
  } catch (error) {
    // Logging any errors that occur during configuration
    console.log(error);
  }
};
