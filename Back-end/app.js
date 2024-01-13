require('dotenv').config();
const express = require("express");
const app = express();
const path = require('path');
const fs = require('fs');
const https = require('https');
const session = require("express-session");
const {engine} = require("express-handlebars");
const registerR = require("./routes/register.r");
const categoriesR = require("./routes/categories.r");
const authGoogleRoute = require("./routes/auth/auth-google.r.js");
const authLogin = require("./routes/auth/auth-login.r.js");
const port = 3000;
const secret = "My secret";

app.use(express.urlencoded({ extended: true }));
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));
require('./config/passport-setup.js')(app);
require("./config/passport-login.js")(app);

app.get("/", (req, res) => {
    res.render('home');
});

app.use("/login", authLogin);
app.use("/auth", authGoogleRoute);
app.use("/register", registerR);
app.use("/categories", categoriesR);
app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err)
            throw err;
        res.redirect("/");
    });
});

app.get("/chatbox", (req, res) => {
    res.render("chatbox");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

/* const server = https.createServer({
    key: fs.readFileSync(path.join(__dirname,'cert','key.pem')),
    cert: fs.readFileSync(path.join(__dirname,'cert','cert.pem'))
}, app);

server.listen(port, () => console.log(`Secure server on port ${port}`));
 */
