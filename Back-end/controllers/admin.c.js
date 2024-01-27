const paymentKey = process.env.JWT_SECOND;
const AccM = require("../models/acc.m");
const HttpError = require('../models/http-error')
const paymentUrl = process.env.PAYMENT_SERVER_HOST;
const bcrypt = require('bcrypt');
const saltRound = 10;
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

const changePassword = async (req, res, next ) => {
    const {newPassword, oldPassword} = req.body
    let AdminId = req.userData.userId ;
    let idetifierAdmin ;
    try {
        idetifierAdmin = await AccM.getByUserID(AdminId)
    }
    catch (err) {
        console.log(err)
        console.error(err);
        return next (new HttpError("Some error occurs", 500));
    }
    if(!idetifierAdmin)
    {
        return next (new HttpError("Not exists Admin", 404));
    }
    let match;
    if(idetifierAdmin.Password){
        match = await bcrypt.compare(oldPassword.trim(), idetifierAdmin.Password)
    }
    if(!match) {
        return next (new HttpError ("Wrong password", 420))
    }
    const hashedPw = await bcrypt.hash(newPassword, saltRound)
    try {
    AccM.updateUser({Id : req.userData.userId,username : null,Password : hashedPw})
    }
    catch (err) {
        console.error(err)
        return next(new HttpError("Some error occurr when change password",500));
    }
    return res.json({message : "Password Changed"})
}

module.exports ={ getTransByPage , changePassword};