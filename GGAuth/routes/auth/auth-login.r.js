const express = require("express");
const router = express.Router();
const passport = require("passport");

// Login with username and password
router.get("/", (req, res) => {
    res.render("login");
});

router.post("/", passport.authenticate("myStrategy", {
    failureRedirect: "/"
}), (req, res) => {
    res.redirect("/categories");
});

module.exports = router;