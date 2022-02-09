const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

app.use(express.json());

app.use(cors());

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Conneted to DB");
});

app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend Running");
});
