const store = require('../storage/store');
let orderCount = 0;
const nthOrder = 5; // Discount on every 5th order

// Generate discount code
exports.generateDiscountCode = () => {
  orderCount++;
  if (orderCount % nthOrder === 0) {
    const code = `DISCOUNT-${orderCount}`;
    store.discountCodes.push({ code, used: false });
    return code;
  }
  return null;
};

// Apply discount
exports.applyDiscount = (code, total) => {
  const discount = store.discountCodes.find(
    (dc) => dc.code === code && !dc.used
  );
  if (!discount) throw new Error('Invalid or already used discount code!');
  discount.used = true;
  return total * 0.9; // 10% discount
};
