const express = require('express');

const Handlebars = require("handlebars");
const { engine } = require("express-handlebars");
const path = require('path')

const app = express();


// setting handlebars
app.use(express.static(path.join(__dirname, "public")));
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/resources/views"));

// globle setting 
app.use(express.static("/public"));


// route setting 

app.get('/' ,(req, res, next) => {
    res.render("AdminPanel")
});

app.get('/admin/customers' , (req, res, next) => {
    res.render("AdminCus")
})

app.listen(3000, () => {console.log("Server is running at 3000")});

