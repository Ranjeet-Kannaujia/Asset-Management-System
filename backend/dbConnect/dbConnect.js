require("dotenv").config();

const mongoose = require("mongoose");
const dbURI = process.env.SESSION_KEY;

mongoose
  .connect(dbURI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

mongoose.set("strictQuery", true); // Add this line to suppress the warning

console.log("Server is running on port 9000");
