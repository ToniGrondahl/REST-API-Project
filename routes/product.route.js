const express = require("express");
const Product = require("../models/product.model.js");
const router = express.Router();
const {getAll, getProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/product.controller.js');

// Get all products
router.get('/', getAll);

// Create a new product
router.post("/", createProduct);

// Get a product by ID
router.get("/:id", getProduct);

// Update a product by ID
router.put("/:id", updateProduct);

// Delete a product by ID
router.delete("/:id", deleteProduct);

module.exports = router;