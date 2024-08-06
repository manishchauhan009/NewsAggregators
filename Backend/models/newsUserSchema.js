const mongoose = require("mongoose");

// Define the schema for a user who uploads news
const newsUserSchema = new mongoose.Schema({
    Email: String,               // Email address of the user
    Username: String,            // Username of the user
    Password: String,            // Password of the user
    role: {                      // User role (admin or user)
        type: String,
        enum: ['admin', 'user'],
        default:'user'  // Enum restricts the role to 'admin' or 'user'
    },
    currentemail: {
        type: String, // The email address
        required: false // Ensure the email field is provided
      },
      newsItems: [String]
    , currentemail1: {
        type: String, // The email address
        required: false // Ensure the email field is provided
      },
      newsItems1: [String]
});

// Export the mongoose model based on the schema
module.exports = mongoose.model("userData", newsUserSchema);
