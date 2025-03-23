const express = require("express");
const dbConnect = require("./config/databaseConnection");
const configureMiddleware = require("./middleware/middleware");
const routes = require("./routes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cloudinary = require("./config/cloudinary");

const PORT = process.env.PORT || 4000;
const app = express();

configureMiddleware(app);

// Register routes
app.use("/api", routes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Initialize services
(async () => {
  try {
    await dbConnect();
    console.log("✅ Database connected successfully");
    cloudinary.cloudinaryConnect();
    console.log("✅ Cloudinary connected successfully");
  } catch (error) {
    console.error("❌ Error initializing services:", error);
    process.exit(1); // Exit process if services fail
  }
})();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is Running on Port ${PORT}`);
});
