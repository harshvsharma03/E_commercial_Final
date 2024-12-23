const store = require("../storage/store");

const {
  generateDiscountCode,
  applyDiscount,
} = require('../utils/discountUtils');

exports.addToCart = (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.body.userId;

  if (!store.products.some((p) => p.id === productId)) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (!store.carts[userId]) {
    store.carts[userId] = [];
  }

  const cart = store.carts[userId];
  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  res.redirect(`/cart/${userId}`);
};

exports.getCart = (req, res) => {
  const userId = req.params.userId;
  const cart = store.carts[userId] || [];
  const total = cart.reduce((sum, item) => {
    const product = store.products.find((p) => p.id === item.productId);
    return sum + (product.price * item.quantity);
  }, 0);

  const cartDetails = cart.map((item) => {
    const product = store.products.find((p) => p.id === item.productId);
    return { ...item, productName: product.name, productPrice: product.price };
  });

  res.render("cart", { cart: cartDetails, total, userId });
};

exports.checkout = (req, res) => {
  const { userId, discountCode } = req.body;
  const cart = store.carts[userId] || [];

  if (cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  let total = cart.reduce((sum, item) => {
    const product = store.products.find((p) => p.id === item.productId);
    return sum + (product.price * item.quantity);
  }, 0);

  if (store.discountCodes.includes(discountCode)) {
    total *= 0.9; // Apply 10% discount
    store.discountCodes = store.discountCodes.filter((code) => code !== discountCode);
  }

  store.orders.push({ userId, cart, total });
  store.carts[userId] = [];

  res.render("checkout", { total });
};
