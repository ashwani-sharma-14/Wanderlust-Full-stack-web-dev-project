const Listing = require("../models/listing.js");
const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
}

module.exports.signupUser = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }

  module.exports.getLoginUser = async (req, res) => {
    res.render("users/login.ejs");
  }

  module.exports.postLoginUser = async (req, res) => {
    req.flash("success", "Welcome Back to WanderLust");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect( redirectUrl);
  }

  module.exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "You are logged out!");
      res.redirect("/listings");
    });
  };