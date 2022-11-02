const path = require("path");
const express = require("express");
const Suppliers = require("../models/supplier.model");
const Router = express.Router();


//Insert

Router.post(
  "/insert",
  async (req, res) => {
    try {
      let supplier = new Suppliers({
        supplierName: req.body.supplierName,
        address: req.body.address,
        contact: req.body.contact,
      });
      await supplier.save();
      res.send("Supplier details uploaded successfully.");
    } catch (error) {
      res
        .status(400)
        .send("Error while uploading Supplier details. Try again later.");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);


Router.get("/getAllSuppliers", async (req, res) => {
  try {
    const suppliers = await Suppliers.find({});
    const sortedByCreationDate = suppliers.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of Suppliers. Try again later.");
  }
});

Router.get("/getAllSuppliers/:id", async (req, res) => {
  try {
    const suppliers = await Suppliers.find({_id:req.params.id})
    const sortedByCreationDate = suppliers.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of Suppliers. Try again later.");
  }
});

////////////////////////////////////

//Update
Router.put("/:id", async (req, res) => {
  try {
    let supplier = await Suppliers.findById(req.params.id);
    const data = {
      supplierName: req.body.supplierName || supplier.supplierName,
      address: req.body.address || supplier.address,
      contact: req.body.contact || supplier.contact,
    };
    supplier = await Suppliers.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(supplier);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

//////////////////////////////////////

//Delete
Router.delete("/:id", async (req, res) => {
  try {
    // Find supplier by id
    const supplier = await Suppliers.findById(req.params.id);
    if (!supplier) throw Error("No file found");
   // Delete supplier from db
    const removed = await supplier.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the file");
    res.json(supplier);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = Router;