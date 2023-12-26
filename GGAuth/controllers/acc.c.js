const accM = require("../models/acc.m");
const bcrypt = require("bcrypt");
const saltRound = 10;

module.exports = {
    signUpHandler: async (req, res, next) => {
        const un = req.body.username;
        const acc = await accM.getByUsername(un);
        if (acc) {
            console.log(`This username '${acc.Username}' has been existed`);
            res.redirect("/register");
        } else {
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;
            const dob = req.body.dob;

            if (!name || !email || !password || !dob) {
                redirect("/register");
            } else {
                const hashedPw = await bcrypt.hash(password, saltRound);
                const rs = await accM.add(new accM({ Name: name, Username: un, Email: email, Password: hashedPw, DOB: dob, Permission: 1 }));
                req.session.auth = true;
                res.redirect("/categories");
            }

        }
    },

    logInHandler: async (req, res, next) => {
        const userName = req.body.un;
        const passWord = req.body.pw;
        const acc = await accM.getByUsername(userName);
        if (!acc) {
            console.log("none acc");
            return res.redirect("/");
        }

        const check = await bcrypt.compare(passWord, acc.Password);

        if (!check) {
            console.log("Incorrect password");
            return res.redirect("/");
        }

        req.session.auth = true;
        res.redirect("/categories");
    }
}