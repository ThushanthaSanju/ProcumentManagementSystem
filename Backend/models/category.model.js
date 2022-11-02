const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CategoryModel = new Schema({
    categoryName:{type: String},
    categoryDescription:{type: String},
    avatar: { type: String },
    cloudinary_id: { type: String },
},
{
  toJSON: {
    transform: function(doc,ret){
      ret.categoryId = ret._id.toString();
      delete ret._id;
      delete ret._v;
    }
  }
},
{
    timestamps: true,
  }
);

module.exports = mongoose.model("CategoryModel", CategoryModel);
