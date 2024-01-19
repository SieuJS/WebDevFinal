const db = require("../utils/db");
const pgp = require("pg-promise")({capSQL: true});

const tbName = "Products";
module.exports = class Product{
    static async getByCat(catID) {
        try {
            const data = await db.any(`SELECT * FROM "${tbName}" tb1 JOIN "Categories" tb2 ON tb1."CatID" = tb2."CatID" WHERE tb2."CatID" = ${catID}`, [catID]);
            return data;
        } catch (error) {
            throw error
        }
    }

    static async getByProID(proID) {
        try {
            const data = await db.any(`SELECT * FROM "${tbName}" WHERE "ProID" = ${proID}`, [proID]);
            return data;
        } catch (error) {
            throw error
        }
    }

    static async getMaxID() {
        try {
            const data = await db.one(`SELECT MAX("ProID") FROM "${tbName}"`);
            return data;
        } catch (err) {
            throw err;
        }
    }

    static async add(entity) {
        try {
            const query = pgp.helpers.insert(entity, null, tbName);
            const data = await db.one(query + `RETURNING "ProID"`);
            return data;
        } catch (err) {
            throw err;
        }
    }

    static async updateProduct(entity) {
        try {
            // update_product is a custome procedure of Postgresql database
            await db.proc("proc_update_product", [
                entity.ProID,
                entity.ProName,
                entity.TinyDes,
                entity.FullDes,
                entity.Price,
                entity.CatID,
                entity.Quantity,
                entity.Image
            ])
        } catch (error) {
            throw error;
        }
    }

    static async deleteProduct(proID) {
        try {
            // update_product is a custome procedure of Postgresql database
            await db.proc("proc_delete_product", [proID])
        } catch (error) {
            throw error;
        }
    }

    // static async getMaxID() {
    //     try {
    //         const data = await db.one(`SELECT MAX("CatID") FROM "${tbName}"`);
    //         return data;
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    // static async deleteByID(id) {
    //     try {
    //         const data = await db.oneOrNone(`DELETE FROM "${tbName}" WHERE "CatID" = ${id}`);
    //         return data;
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    // static async updateByID(entity, id) {
    //     try {
    //         // const condition = pgp.as.format(` where "CatID" = ${id}`, entity);
    //         const query = pgp.helpers.update(entity, null, tbName) + ` where "CatID" = ${id}`; 
    //         const data = await db.oneOrNone(query);
    //         return data;
    //     } catch (err) {
    //         throw err;
    //     }
    // }
}