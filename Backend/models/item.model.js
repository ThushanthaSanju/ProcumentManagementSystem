const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemModel = new Schema({
    supplierName:{type: String},
    itemName:{type: String},
    quantity:{type: Number},
    price:{type: Number},
    avatar: { type: String },
    cloudinary_id: { type: String },
},
{
    timestamps: true,
  }
);

module.exports = mongoose.model("ItemModel", ItemModel);