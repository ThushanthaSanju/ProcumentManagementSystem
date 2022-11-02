const path = require("path");
const express = require("express");
const multer = require("multer");
const Categorys = require("../models/category.model");
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
      let item = new Categorys({
        categoryName: req.body.categoryName,
        categoryDescription: req.body.categoryDescription,
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

Router.get("/getAll", async (req, res) => {
  try {
    const items = await Categorys.find({});
    const sortedByCreationDate = items.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of Categorys. Try again later.");
  }
});


Router.get("/getCatbyId/:id", async (req, res) => {
  try {
    const orders = await Categorys.find({_id:req.params.id})
    const sortedByCreationDate = orders.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of Categorys. Try again later.");
  }
});

Router.get("/getCatebyname/:categoryName", async (req, res) => {
  try {
    const orders = await Categorys.find({categoryName:req.params.categoryName})
    const sortedByCreationDate = orders.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of Categorys. Try again later.");
  }
});


module.exports = Router;