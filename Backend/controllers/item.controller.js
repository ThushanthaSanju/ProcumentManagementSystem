const path = require("path");
const express = require("express");
const multer = require("multer");
const Items = require("../models/item.model");
const Router = express.Router();
const cloudinary = require("../utils/cloudinary.js");
const upload = require("../utils/multer.js");

//Insert

Router.post(
  "/insert",
  upload.single("image"),
  async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      let item = new Items({
        supplierName: req.body.supplierName,
        itemName: req.body.itemName,
        quantity: req.body.quantity,
        price: req.body.price,
        avatar: result.secure_url,
        cloudinary_id: result.public_id,
      });
      await item.save();
      res.send("Item details uploaded successfully.");
    } catch (error) {
      res
        .status(400)
        .send("Error while uploading Item details. Try again later.");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

//////////////////////////////////////////
// get item details

Router.get("/getAllItems", async (req, res) => {
  try {
    const items = await Items.find({});
    const sortedByCreationDate = items.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.json(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of Items. Try again later.");
  }
});


Router.get("/getItembyId/:id", async (req, res) => {
  try {
    const orders = await Items.find({_id:req.params.id})
    const sortedByCreationDate = orders.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.json(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of Items. Try again later.");
  }
});

Router.get("/getItembyname", async (req, res) => {
  try {
    const orders = await Items.find({itemName:req.query.itemName})
    const sortedByCreationDate = orders.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of Items. Try again later.");
  }
});

////////////////////////////////////

//Update
Router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let item = await Items.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(item.cloudinary_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      itemName: req.body.itemName || item.itemName,
      quantity: req.body.quantity || item.quantity,
      price: req.body.price || item.price,
      avatar: result?.secure_url || item.avatar,
      cloudinary_id: result?.public_id || item.cloudinary_id,
    };
    item = await Items.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(item);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

//////////////////////////////////////

//Delete
Router.delete("/:id", async (req, res) => {
  try {
    // Find item by id
    const item = await Items.findById(req.params.id);
    if (!item) throw Error("No file found");
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(item.cloudinary_id);
    // Delete item from db
    const removed = await item.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the file");
    res.json(item);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = Router;