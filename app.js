const express = require('express');

const Handlebars = require("handlebars");
const hbs_sections = require('express-handlebars-sections')
const { engine } = require("express-handlebars");
const path = require('path')

const app = express();


// setting handlebars
app.use(express.static(path.join(__dirname, "public")));
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    helpers: {
      section: hbs_sections()
    }
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


app.get('/admin/category' , (req, res, next) => {
  res.render("AdminCat")
})

app.get('/admin/product' , (req, res, next) => {
  res.render("viewsAdminProduct/AdminProduct")
})

app.get('/admin/product/add' , (req, res, next) => {
  res.render("viewsAdminProduct/AdminAddProduct")
})

app.get('/admin/product/edit' , (req, res, next) => {
  res.render("viewsAdminProduct/AdminEditProduct")
})

app.listen(3000, () => {console.log("Server is running at 3000")});

