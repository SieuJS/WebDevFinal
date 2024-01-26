const db = require("../utils/db");
const pgp = require("pg-promise")({capSQL: true});

module.exports = class Trans {
    static async getBalanceByID(id) {
        try {
            const data = await db.oneOrNone(`SELECT "Balance" FROM "Account" WHERE "AccID" = $1`, [id]);
            return data;
        } catch (err) {
            throw err;
        }
    }

    static async updateBalanceByID(id, balance) {
        try {
            const data = await db.oneOrNone(`UPDATE "Account" SET "Balance" = $1 WHERE "AccID" = $2`, [balance, id]);
            return data;
        } catch (err) {
            throw err;
        }
    }

    static async transaction(id, amount) {
        try {
            const data = await db.proc("proc_transaction", [id, 1, amount]);
            return data;
        } catch (err) {
            throw err;
        }
    }

    static async saveTrans(id, orderID, amount) {
        try {
            const data = await db.proc("proc_save_trans", [id,1,orderID,amount])
            return data;
        } catch (err) {
            throw err;
        }
    }

    static async getByPage(accID, page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const limit = pageSize;
            const accIDCondition = accID ? `WHERE "AccID" = ${accID}` : ''
            const data = await db.any(`SELECT * FROM "Transaction" ${accIDCondition}  LIMIT ${limit} OFFSET ${offset}`);
            const total = await db.one(`SELECT COUNT(*) FROM "Transaction" ${accIDCondition}`);
            
            const totalData = parseInt(total.count)
            const totalPage = Math.ceil(totalData / pageSize);

            return {
                data: data,
                totalPage: totalPage,
                total: totalData
            }
        } catch (error) {
            throw error;
        }
    }
}