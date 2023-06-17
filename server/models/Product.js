const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    product_file: {
      type: String,
      required: true
    },
    product_name: {
      type: String,
      required: true
    },
    genres: [String],
    type: String,
    product_image: {
      type: String,
      default: ""
    },
    number_of_downloads: Number,
    release_date: {
      type: Date,
      default: Date.now
    },
    github_repo: String,
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;