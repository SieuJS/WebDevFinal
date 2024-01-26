const paymentKey = process.env.JWT_SECOND;
const accM = require("../models/acc.m");
const HttpError = require('../models/http-error')
const paymentUrl = process.env.PAYMENT_SERVER_HOST;
const jwt = require('jsonwebtoken')
const getToken = () => {
  let token;
  try {
    token = jwt.sign(
      {
        message: "Main server",
      },
      paymentKey,
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
  return token;
};

const getTransByPage = async (req, res, next) => {
  const page = req.query.page || 1;
  const userID = parseInt(req.query.userID);

  console.log(userID)
  let response ;
  let paymentToken = getToken();
  try {
    response =await fetch(`${paymentUrl}/api/trans/get-by-page?${userID?`userID=${userID}&` :""}page=${page}`, 
    {
        method : "GET",
        headers : {
            Authorization : `bearer ${paymentToken}`
        }
    })
  }
  catch (err) {
    console.error(err)
    return next (new HttpError("Can not connect to get your data"));
  }
  const data = await response.json();
  if(!response.ok){
    console.error(data.message)
    return next (new HttpError("No userID have detect"));
  }
  else 
  return res.json(data)
};

module.exports ={ getTransByPage};