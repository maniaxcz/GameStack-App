const mongoose = require('mongoose');
const config = require('../config/database');    //Requires Database to Store products

// User Schema
const productSchema = mongoose.Schema({
    name: {
        type: String
    },
    img:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:String,
        required: true
    },
    Catag: {
        type: String,
        required: true
    },
});


const Product = module.exports = mongoose.model('Product', productSchema);

module.exports.addProduct = function (newProduct, callback) {
    newProduct.save(callback);
       
}

module.exports.editProduct = function (oldProductID,newProduct, callback) {
    const query = { _id: oldProductID }
    Product.findByIdAndUpdate(query,newProduct, callback);

}

module.exports.removeProduct = function (productID, callback) {
    const query = { _id: productID };
    Product.remove(query, callback);

}
