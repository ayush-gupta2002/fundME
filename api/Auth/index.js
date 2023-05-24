const passport = require("passport");
const LoginStrategy = require("./LoginStrategy");
const RegisterStrategy = require("./RegisterStrategy");
passport.serializeUser(function (email, done) {
  done(null, email);
});
passport.deserializeUser(function (email, done) {
  done(null, email);
});
passport.use("local-login", LoginStrategy);
passport.use("local-register", RegisterStrategy);

module.exports = passport;
