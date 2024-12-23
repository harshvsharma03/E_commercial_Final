const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/discount-code", adminController.generateDiscountCode);
router.get("/sales", adminController.getSalesData);

module.exports = router;