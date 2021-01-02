// import dependencies
// load libraries
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const formidable = require("express-formidable");
const compression = require("compression");
const cors = require("cors");

// initiate app
const app = express();

// importing route
const routes = require("./router.js");

// environment variable config
if (process.env.NODE_ENV !== "production") require("dotenv").config();

// app config
app.use(passport.initialize());
require("./config/auth")(passport);
app.use(compression()); // compress req/res payload
app.use(formidable({ multiples: true })); // form data parser
app.use(express.static(__dirname + "/images")); // for storing image/meme
app.use(cors());

// set public directory for uploading images
app.use((req, res, next) => {
  req.publicDir = path.join(__dirname, "images");
  next();
});

// db config
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
mongoose
  .connect(process.env.DB_URL, dbOptions)
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log(error));

// serve routes
app.use(routes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
