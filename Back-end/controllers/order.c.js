const orderM = require('../models/order.m')
const orderDetailM = require('../models/orderDetail.m')
const jwt = require('jsonwebtoken')
const jwtSecondKey = process.env.JWT_SECOND
require('dotenv').config()
const paymentServerURL = process.env.PAYMENT_SERVER_HOST

module.exports = {
  placeOrder: async (req, res, next) => {
    try {
      const date = new Date().toString().split(' GMT')[0];
      const userId = req.userData.userId;
      const products = req.body.products;
      const total = req.body.total;
      const address = req.body.info.address;
      const phone = req.body.info.phone;

      //Thêm token để gửi đến server phụ
      try {
        token = jwt.sign(
          {
            userId: userId,
            amount: total
          },
          jwtSecondKey,
          { expiresIn: "1h" }
        );
      } catch (err) {
        console.error(err)
        const error = new HttpError(
          'Something wrong when add jwt', 500
        );
        return next(error);
      }
      //Gọi fetch kiểm tra bên server phụ
      const checkPayment = await fetch(paymentServerURL + '/api/trans', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (!checkPayment.ok) {
        return res.status(checkPayment.status || 401).json({ isSuccess: false });
      }
      try {
        const orderid = await orderM.insert(date, userId, total, address, phone);
        for (const product of products) {
          let item = new orderDetailM(orderid, product);
          await orderDetailM.insert(item);
        }
      }
      catch (e) {
        console.log(e);
        return res.status(502).json({ isSuccess: false, message: "Lỗi khi thêm dữ liệu" });
      }

      res.status(200).json({ isSuccess: true });
    }
    catch (e) {
      console.log(e);
    }
  },
  getOrdersHandler: async (req, res, next) => {
    const userId = req.userData.userId;
    ///console.log("query page in orders controller", req.query.page);
    if (!req.query.page) {
      const orders = await orderM.getByUserId(userId);
      res.json({
        total_pages: 1,
        total: orders.length,
        orders: orders
      });
      return;
    }
    const page = parseInt(req.query.page);
    const per_page = parseInt(req.query.per_page);
    const offset = (page - 1) * per_page;
    const data = await orderM.getByPage(userId, offset, per_page);
    const totalRow = await orderM.getTotalByUserId(userId);
    console.log("total row", totalRow);
    res.json({
      total_pages: Math.ceil(totalRow / per_page),
      total: totalRow,
      orders: data
    })
  },
  getDetail: async (req, res, next) => {
    const orderId = req.params.orderId;
    //console.log("orderID in get detail func", orderId);
    const details = await orderDetailM.getAllDetails(orderId);
    res.json({
      detail: details
    })
  }
}