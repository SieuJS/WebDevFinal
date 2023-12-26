const express = require("express");
const router = express.Router();
const passport = require("passport");

// authenticate with Google
router.get("/google", passport.authenticate('google', {
    scope: ['profile']
}));

// callback route of OAuth
router.get("/google/redirect", passport.authenticate('google', {
    successRedirect: "/categories",
    failureRedirect: "/"
}));

module.exports = router;