const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    shipping: {
      type: Boolean,
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Product = mongoose.model("Product", ProductSchema);
