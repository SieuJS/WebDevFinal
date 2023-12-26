const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const pgp = require('pg-promise')({
    capSQL: true
});

const cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DB,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    max: 30
};

const db = pgp(cn);

module.exports = {
    getAll: async (tbName) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            const data = await dbcn.any(`SELECT * FROM "${tbName}"`);
            return data;
        }catch(error) {
            throw error;
        }finally {
            dbcn.done();
        }
    },
    get: async (tbName, fieldName, value) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            const data = await dbcn.oneOrNone(`SELECT * FROM "${tbName}" WHERE "${fieldName}" = $1`, [value]);
            return data;
        }catch(error) {
            throw error;
        }finally {
            dbcn.done();
        }
    },
    insert: async (tbName, entity, idName = "id") => {
        const query = pgp.helpers.insert(entity, null, tbName);
        const data = await db.one(query + `RETURNING "${idName}"`);
        return data;
    },
    getAllJoin: async (tbName1, tbName2, field1, field2, value) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            const data = await dbcn.any(`SELECT * FROM "${tbName1}" tb1 JOIN "${tbName2}" tb2 ON tb1."${field1}" = tb2."${field2}" WHERE tb1."${field1}" = ${value}`, [value]);
            return data;
        }catch(error) {
            throw error;
        }finally {
            dbcn.done();
        }
    }
}
