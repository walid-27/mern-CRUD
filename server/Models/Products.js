const mongoose =require("mongoose");
const productSchema = new mongoose.Schema({
    description: String,
    title: String,
    price: Number, 
    image: String,
    

});

const ProductModel = mongoose.model("products", productSchema);
module.exports = ProductModel;