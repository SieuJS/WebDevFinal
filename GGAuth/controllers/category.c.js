const categoryM = require("../models/category.m");

module.exports = {
    loadCatList: async (req, res, next) => {
        const category = await categoryM.getAll();
        //console.log(category);
        res.render("categories", {
            category: category,
            isAuth: true
        });
    },

    loadProductList: async (req, res, next) => {
        const catID = req.params.catID;
        //console.log(`CatID: ${catID}`);
        const data = await categoryM.loadProducts(catID);
        res.render("products", {
            product: data,
            isAuth: true
        });
    }
}