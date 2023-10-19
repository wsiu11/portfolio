let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const Products = require('../models/product');

// connect with our model

router.get('/', (req, res, next) => {
    Products.find().then((err, ProductList) => {
        if (err) {
            return console.error(err);
        }
        else {
            console.log(ProductList);
        }
    });
});

module.exports = router;