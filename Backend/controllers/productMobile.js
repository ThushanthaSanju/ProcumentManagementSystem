const express = require("express");
const productRouter = express.Router();
const auth = require("../middleware/auth");
const { Product } = require("../models/product");


productRouter.post("/add-product", async (req, res) => {
    try {
      const { name, description, images, quantity, price, category } = req.body;
      let product = new Product({
        name,
        description,
        images,
        quantity,
        price,
        category,
      });
      product = await product.save();
      res.json(product);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });


productRouter.get("/products/", auth, async (req, res) => {
  try {
    const products = await Product.find({ category: req.query.category });
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



productRouter.get("/productsad", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

productRouter.put("/productsad/:id", async (req, res) => {
  try {
    let products = await Product.findById(req.params.id);
    const data = {
      images: req.body.images || products.images,
      category: req.body.category || products.category,
      quantity: req.body.quantity || products.quantity,
    };
    products = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(products);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});


//Delete
productRouter.delete("/productsad/:id", async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    const removed = await products.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the file");
    res.json(products);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

// create a get request to search products and get them
// /api/products/search/i
productRouter.get("/products/search/:name", auth, async (req, res) => {
  try {
    const products = await Product.find({
      name: { $regex: req.params.name, $options: "i" },
    });

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


module.exports = productRouter;
