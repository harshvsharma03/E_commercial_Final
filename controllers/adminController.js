const store = require("../storage/store");

const {
  generateDiscountCode,
  applyDiscount,
} = require('../utils/discountUtils');

exports.generateDiscountCode = (req, res) => {
  const discountCode = `DISCOUNT${Date.now()}`;
  store.discountCodes.push(discountCode);
  res.render("discount", { message: "Discount code generated", discountCode });
};

exports.getSalesData = (req, res) => {
  const totalItemsSold = store.orders.reduce((sum, order) => {
    return sum + order.cart.reduce((cartSum, item) => cartSum + item.quantity, 0);
  }, 0);

  const totalRevenue = store.orders.reduce((sum, order) => sum + order.total, 0);

  res.render("sales", {
    totalItemsSold,
    totalRevenue,
    discountCodesUsed: store.discountCodes.length,
  });
};