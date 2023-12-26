const express = require("express");
const router = express.Router();
const passport = require("passport");
const categoryC = require("../controllers/category.c");

// protect the categories route
router.use((req, res, next) => {
    if (!req.user) {
        console.log("cannot route to /categories");
        res.redirect("/login")
    }else {
        next();
    }
})

router.get("/", categoryC.loadCatList);
router.get("/:catID", categoryC.loadProductList);

module.exports = router;