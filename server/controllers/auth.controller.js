// import dependency
// load models
const User = require("../models/user.model");

// load libraries
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { escape } = require("validator");
const path = require("path");

// load utitlities
const generateRandomId = require("../utils/generateRandomId");

// load validators
const validateSignUpInput = require("../validators/signup.validator");
const validateLoginInput = require("../validators/login.validator");
const validateMimeType = require("../../../../softx/library-management-system/utils/validateMimeType");
const addImage = require("../../../../softx/library-management-system/lib/addImage");

// load environment variables
require("dotenv").config();

exports.postSignUp = async (req, res) => {
  try {
    console.log(req.fields);
    // validate incoming payload
    const { errors, isValid } = validateSignUpInput(req.fields);
    if (!isValid) return res.status(400).json(errors);

    // destructering body
    let { name, email, password } = req.fields;
    console.log(req.fields);
    // get profile image
    let { profileImage } = req.files;

    // sanitize inputs
    // validated email is secure enough
    // and password will be hashed anyway
    name = escape(name);

    let image;
    if (profileImage && profileImage.size) {
      if (!validateMimeType(profileImage))
        return res.status(400).json({ error: "Invalid image type" });

      image = await addImage(profileImage, req.publicDir);
    } else {
      image = path.join(req.publicDir, "profile.jpg");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword, image });

    await newUser.save();
    delete newUser._doc.password;
    res.status(200).json({
      message: "User created successfully. Please Login to continue",
      user: newUser,
    });
  } catch (error) {
    console.log(error); // this for dev purpose
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.postLogin = async (req, res) => {
  try {
    // incoming payload
    const { errors, isValid } = validateLoginInput(req.fields);
    if (!isValid) return res.status(400).json(errors);

    // destructering form data
    let { password, email } = req.fields;

    const user = await User.findOne({ email });
    // check if user exists
    if (!user) {
      errors.email = "User with this email not found";
      return res.status(404).json(errors);
    }

    // check for password
    const doMatch = await bcrypt.compare(password, user.password);

    if (!doMatch) {
      errors.password = "Wrong Password";
      return res.status(403).json(errors);
    }

    // create payload
    let { _id, name, image } = user;
    const payload = { _id, name, email: user.email, image }; // getting email like this because I am in variable naming dilemma -_-
    const secret_key = process.env.SECRET_KEY;

    // attach payload to jwt token
    const token = jwt.sign(payload, secret_key, { expiresIn: "1h" });

    res.status(200).json({
      message: "Logged in successfully",
      token: `Bearer ${token}`,
    });
  } catch (error) {
    console.log(error); // this for dev purpose
    res.status(500).json({ error: "Something went wrong" });
  }
};

// exports.getCurrentUser = async (req, res) => {
//   try {
//     const { _id, name, email, avatar } = req.user;
//     res.status(200).json({ _id, name, email, avatar });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// };
