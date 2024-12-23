const store = require("../storage/store");

const {
  generateDiscountCode,
  applyDiscount,
} = require('../utils/discountUtils');

exports.getProducts = (req, res) => {
  res.render("products", { products: store.products });
};