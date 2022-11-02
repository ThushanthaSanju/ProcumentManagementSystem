const mongoose = require("mongoose");
const { ItemModel } = require("./item.model");
const Schema = mongoose.Schema;

const UserModel = new Schema({
    userName:{type: String},
    email:{type: String},
    contactNo:{type: Number},
    address:{type: String},
    password: {type:String},
    avatar: { type: String },
    cloudinary_id: { type: String },
    cart: [{quantity: {type: Number}}]
    // cart: [
    //     {
    //       item:ItemModel,
    //       quantity: {
    //         type: Number,
    //         required: true,
    //       }
    //     }
    //   ],
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("UserModel", UserModel);