const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const SupplierRoute = require('./controllers/supplier.controller');
const ItemRoute = require('./controllers/item.controller');
const OrderRoute = require('./controllers/order.controller');
const UserRoute = require('./controllers/user.controller');
const UserLoginRoute = require('./controllers/userLogin.controller');
const CategoryRoute = require('./controllers/category.controller');

const ProductRoute = require('./controllers/productMobile');
const AdminRoute = require('./controllers/admin.controller');


dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 7070;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log("DataBase ERROR: ", error.message);
    }
  }
);

mongoose.connection.once("open", () => {
  console.log("Database Synced");
});

app.use('/supplier', SupplierRoute);
app.use('/item', ItemRoute);
app.use('/order', OrderRoute);
app.use('/user', UserRoute);
app.use('/userLogin', UserLoginRoute);
app.use('/categorys', CategoryRoute);
app.use('/admin', AdminRoute);

app.use('/product', ProductRoute);



app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });