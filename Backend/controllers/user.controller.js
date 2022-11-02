const express = require("express");
const userRouter = express.Router();
const auth = require("../middleware/auth");
const Order = require("../models/order");
const { Product } = require("../models/product");
const User = require("../models/user");
const Admin = require("../models/admin.Model");


userRouter.post("/add-to-cart", auth, async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    let user = await User.findById(req.user);
    console.log(user);
    if (user.cart.length == 0) {
      user.cart.push({ product, quantity: 1 });
    } else {
      let isProductFound = false;
      for (let i = 0; i < user.cart.length; i++) {
        if (user.cart[i].product._id.equals(product._id)) {
          isProductFound = true;
        }
      }

      if (isProductFound) {
        let producttt = user.cart.find((productt) =>
          productt.product._id.equals(product._id)
        );
        producttt.quantity += 1;
      } else {
        user.cart.push({ product, quantity: 1 });
      }
    }
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

userRouter.delete("/remove-from-cart/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    let user = await User.findById(req.user);

    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i].product._id.equals(product._id)) {
        if (user.cart[i].quantity == 1) {
          user.cart.splice(i, 1);
        } else {
          user.cart[i].quantity -= 1;
        }
      }
    }
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// save user address
userRouter.post("/save-user-address", auth, async (req, res) => {
  try {
    const { address } = req.body;
    let user = await User.findById(req.user);
    user.address = address;
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// order product
userRouter.post("/order", auth, async (req, res) => {
  try {
    const { cart, totalPrice, address } = req.body;
    let products = [];

    for (let i = 0; i < cart.length; i++) {
      let product = await Product.findById(cart[i].product._id);
      if (product.quantity >= cart[i].quantity) {
        product.quantity -= cart[i].quantity;
        products.push({ product, quantity: cart[i].quantity });
        await product.save();
      } else {
        return res
          .status(400)
          .json({ msg: `${product.name} is out of stock!` });
      }
    }

    let user = await User.findById(req.user);
    user.cart = [];
    user = await user.save();

    let order = new Order({
      products,
      totalPrice,
      address,
      userId: req.user,
      orderedAt: new Date().getTime(),
    });
    order = await order.save();
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


userRouter.get("/getAllUsers", async (req, res) => {
  try {
    const products = await User.find({});
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

userRouter.get("/orders/me", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

userRouter.get("/getAllorders", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


userRouter.put("/orderA/:id", async (req, res) => {
  try {
    let book = await Order.findById(req.params.id);
    const data = {
      status: req.body.status || book.status,
    };
    book = await Order.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(book);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

// userRouter.put("/orderAb/:id",async (req, res) => {
//   const { status } = req.body;

//   const id = req.params.id;
//   let reservation;
//   try {
//     reservation = await Order.findById(id);
//   } catch (err) {
//     console.log("Error updating");
//   }
//   reservation.status = status;

//   await reservation.save((err) => {
//     if (err) return res.status(400).json({ success: false, err });
//     return res.status(200).json({ success: true });
//   });
// });

//Delete
userRouter.delete("/orderAad/:id", async (req, res) => {
  try {
    const book = await Order.findById(req.params.id);
    const removed = await book.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the file");
    res.json(book);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

userRouter.post('/signupAd',(req,res)=>{
  Admin.findOne({email:req.body.email},(err,user)=>{
      if(err){
          console.log(err)
          res.json(err)
      }else{
          if(user==null){
              const user = Admin({
                  email:req.body.email,
                  password:req.body.password
              })
              user.save()
              .then((err)=>{
                  if(err){
                      console.log(err)
                      res.json(err)
                  }else{
                      console.log(user)
                      res.json(user)
                  }
                  
              })
          }else{

          res.json({
              message:'email is not avilable'
          })   
          }
      }
  })
  
})


module.exports = userRouter;
