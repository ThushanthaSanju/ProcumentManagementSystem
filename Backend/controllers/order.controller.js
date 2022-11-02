const path = require("path");
const express = require("express");
const Orders = require("../models/order.model");
const Router = express.Router();


//Insert

Router.post(
  "/insert",
  async (req, res) => {
    try {
      let order = new Orders({
        supplierName: req.body.supplierName,
        orderID: req.body.orderID,
        orderAddress: req.body.orderAddress,
        orderContact: req.body.orderContact,
        delivery: req.body.delivery,
      });
      await order.save();
      res.send("Order details uploaded successfully.");
    } catch (error) {
      res
        .status(400)
        .send("Error while uploading Order details. Try again later.");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);


Router.get("/getAllOrders", async (req, res) => {
  try {
    const orders = await Orders.find({});
    const sortedByCreationDate = orders.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of Orders. Try again later.");
  }
});

// Router.get("/getAllOrders/:id", async (req, res) => {
//   try {
//     const orders = await Orders.find({_id:req.params.id})
//     const sortedByCreationDate = orders.sort(
//       (a, b) => b.createdAt - a.createdAt
//     );
//     res.send(sortedByCreationDate);
//   } catch (error) {
//     res.status(400).send("Error while getting list of Orders. Try again later.");
//   }
// });

////////////////////////////////////

//Update
Router.put("/:id", async (req, res) => {
  try {
    let order = await Orders.findById(req.params.id);
    const data = {
      supplierName: req.body.supplierName || order.supplierName,
      orderID: req.body.orderID || order.orderID,
      orderAddress: req.body.orderAddress || order.orderAddress,
      orderContact: req.body.orderContact || order.orderContact,
      delivery: req.body.delivery  || order.delivery,
    };
    order = await Orders.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(order);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

//////////////////////////////////////

//Delete
Router.delete("/:id", async (req, res) => {
  try {
    // Find order by id
    const order = await Orders.findById(req.params.id);
    if (!order) throw Error("No file found");
   // Delete order from db
    const removed = await order.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the file");
    res.json(order);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = Router;