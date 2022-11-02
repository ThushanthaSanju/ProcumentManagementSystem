const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminModel = new Schema({
    email:{type: String},
    password:{type: String},
    avatar: { type: String },
},
{
    timestamps: true,
  }
);

module.exports = mongoose.model("AdminModel", AdminModel);