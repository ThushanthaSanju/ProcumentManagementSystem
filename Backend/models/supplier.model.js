const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SupplierModel = new Schema({
    supplierName:{type: String},
    address:{type: String},
    contact:{type: Number},
},
);

module.exports = mongoose.model("SupplierModel", SupplierModel);