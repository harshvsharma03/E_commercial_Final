const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const adminRoutes = require("./routes/admin");

const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());

// Routes
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/admin", adminRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
