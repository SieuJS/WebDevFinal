const transM = require('../models/trans.m')
const accM = require('../models/acc.m')
const HttpError = require("../models/http-error")

module.exports = {
    async transaction(req, res, next) {
        console.log(req.userData);
        const userId = req.userData.userId;
        const orderID = 1;
        const amount = req.userData.amount;
        const id = await accM.getIdByUserID(userId);
        try {

            // const { id, orderID, amount } = req.body

            const data = await transM.transaction(id, amount, orderID);

            res.json({message : "The transaction is success"})
        } catch (error) {
            try {
                const res1 = await transM.saveTrans(id, orderID, amount);
            } catch (error2) {
                console.log(error2);
                return next (new HttpError("Error transaction", 500));
            }
            console.error(error);
            return next (new HttpError("Error transaction", 500));
        }
    },

    async getTransByPage (req, res, next){
        try {
            const page = req.query.page || 1;
            let perPage = (req.query.per_page ? parseInt(req.query.per_page) : 7);
            const userID = req.query.userID;
            // let accID = null;
            // if (userID) {
            //     accID = await accM.getIdByUserID(userID);
            // }
            const pageSize = perPage; // số dòng trên 1 trang  
            const result = await transM.getByPage(userID, page, pageSize);
            res.json(result);
        } catch (error) {
            next(error);
        }
    },
}