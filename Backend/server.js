const express = require("express");
const News = require("../Backend/models/newsDataSchema");
const socketIo = require('socket.io');
const cors = require("cors");
const dbConnect = require("./config/databaseConnection"); // Import database connection function
const newsRoutes = require("./routes/newsRoutes"); // Import news routes
const userRoutes = require("./routes/userRoutes"); // Import user routes
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser"); // Importing cookie-parser to handle cookies
const cloudinary = require("./config/cloudinary");
const fileupload = require("express-fileupload");

// const changeStream = News.watch();

// changeStream.on('change', (change) => {
//   console.log('Change detected:', change);

//   // Check for specific field changes
//   if (change.operationType === 'update') {
//     // Extract the `updateDescription` field from the change object
//     const updatedFields = change.updateDescription.updatedFields;
    
//     // Check if a particular field was updated
//     if (updatedFields.hasOwnProperty('Like')) {
//       console.log('Field "Like" was updated. New value:', updatedFields.Like);
//     }
//   }
// });

const PORT = process.env.PORT || 4000;
const app = express();
app.use(
  fileupload({
    useTempFiles: true, // Enabling the use of temporary files for file uploads
    tempFileDir: "/tmp/", // Setting the directory for temporary files
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cookieParser());

// CORS middleware configuration
const allowedOrigins = [
  'https://news-aggregators.vercel.app',
  'http://localhost:3000'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.options('*', cors());

// Route middleware for news-related endpoints
app.use("/api/news", newsRoutes);
// Route middleware for user-related endpoints
app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

cloudinary.cloudinaryConnect();
dbConnect();

app.listen(PORT, () => {
  console.log(`Server is Running at Port No ${PORT}`);
});
