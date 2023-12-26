const express = require("express");
const router = express.Router();
const accC = require("../controllers/acc.c");

router.get("/", (req, res, next) => {
    res.render("register");
});

router.post("/signup", accC.signUpHandler)

module.exports = router;