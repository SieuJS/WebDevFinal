const HttpError = require('../models/http-error')
require("dotenv").config();
const jwt = require('jsonwebtoken')


module.exports = (req, res, next ) => {

    if(req.method === "OPTIONS"){
        return next();
    }
    try {
        
        const authHeaders = req.headers.authorization// authorization : "Bear Token" 
        if(!authHeaders) {
            const error = new Error('Authentication failed');
            throw error;
        }
        const token = authHeaders.split(' ')[1];
        if(!token) {
            const error = new Error('Authentication failed');
            throw error;
        }
        const decodedToken = jwt.verify(token , process.env.JWT_SECRET_KEY);
        // if(decodedToken.message.trim() !== "Main server")
        //     return next (new HttpError("Authentication failed"));
        req.userData = decodedToken;
        next();

    }catch (err) {
        console.log("auth payment server check",err)
        return next (new HttpError(err.message, 401));
    }
};