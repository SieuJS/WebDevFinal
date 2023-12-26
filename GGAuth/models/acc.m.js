const db = require("../utils/db");

module.exports = class Account {
    constructor({Name, Username, Email, Password, DOB, Permission}) {
        this.Name = Name;
        this.Username = Username;
        this.Email = Email;
        this.Password = Password;
        this.DOB = DOB;
        this.Permission = Permission;
    }

    static async getByUsername(un) {
        const rs = await db.get("Users", "Username", un);
        return rs;
    }

    static async add(acc) {
        const data = await db.insert("Users", acc, "ID");
        return data;
    }
}