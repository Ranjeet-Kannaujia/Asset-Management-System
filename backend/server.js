require("./dbConnect/dbConnect");
const express = require("express");
const env = require("dotenv");
env.config();
const app = express();
const session = require("express-session");
const homeRoute = require("./routes/homeRoute/homeRoute");
const assetsRoute = require("./routes/assetsRoute/AssetsRoute");
const userRoute = require("./routes/userRoute/userRoute");
const cors = require("cors");
const globalErrorHandler = require("./middleware/globalErrrorHandler");

const PORT = process.env.PORT || 9000;
const protected = require("./middleware/protected");
const isLogin = require("./middleware/isLogin");
const corsOptions = {
  origin: "http://localhost:5173", // frontend's URL
  credentials: true,
};

// Middlewares
app.use(express.json());
app.use(express.static("public"));
// //pass form data
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

//session config
// app.use(session({ secret: "somekey",
// resave: false,
// saveUninitialized: true
// }));

// Routes
app.use("/", homeRoute);
app.use("/", userRoute);
app.use("/", assetsRoute);

// app.use(cors)

// //404 Error handler
app.all("*", (req, res, next) => {
  console.log(req.originalUrl);
  res.status(404).json({
    msg: `${req.originalUrl} not found`,
  });
});

//global err handler
app.use(globalErrorHandler);

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
