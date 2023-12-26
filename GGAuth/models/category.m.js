const db = require("../utils/db");

const tbName = "Categories";
module.exports = class Category{
    constructor({CatID, CatName}) {
        this.CatID = CatID;
        this.CatName = CatName;
    }

    static async getAll () {
        const data = await db.getAll(tbName);
        return data;
    }

    static async add(category) {
        const rs = await db.insert(tbName, category, "ID");
        return rs;
    }

    static async loadProducts(ID) {
        const result = await db.getAllJoin(tbName, "Products", "CatID", "CatID", ID);
        return result;
    }
}