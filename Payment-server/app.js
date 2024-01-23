require('dotenv').config()

const express = require('express');

//import router 
const AccRouter = require("./routes/acc.r")
const TransRouter = require("./routes/trans.r")

// import middlewares

const checkAuth = require('./middlewares/check-auth')

const Port = process.env.PORT
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use ((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
})

app.use(checkAuth)

app.use("/api/account", AccRouter);
app.use("/api/trans", TransRouter);

app.use((error, req, res, next) => {
    // Check that Have the res been sent ?
    if (req.headerSent) {
        return next(error);
    }
    // Check the status and set it 
    res.status(error.code || 500);
    // Leave the message 
    res.json({ message: error.message || "There some errors occured " });
});

app.listen(Port , ()=> {
    console.log("Server listen on " + Port)
})