// import dependencies
// load libraries
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user.model");

// load environment variables
require("dotenv").config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const userId = jwt_payload._id;
        let user = await User.findById(userId);
        if(user) return done(null, user);
        return done(null, false);
      } catch (error) {
        console.log(error);
        res.status(401).json({ error: error.message });
      }
    })
  );
};
