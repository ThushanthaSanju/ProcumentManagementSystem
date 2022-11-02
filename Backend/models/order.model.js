
const mongoose = require("mongoose");

const ItemModel = require("./item.model.js");
const Schema = mongoose.Schema;


const OderModel = new Schema({
    // items: [
    //     {
    //       item: ItemModel,
    //       quantity: {
    //         type: Number,
    //         required: true,
    //       },
    //     },
    //   ],

      totalPrice: {
        type: Number,
        required: true,
      },
      userId: {
        required: true,
        type: String,
      },
      address: {
        type: String,
        required: true,
      },
    orderContact:{type: Number},
    delivery: {type:String,default:"Pending"},
},
);

module.exports = mongoose.model("OderModel", OderModel);