const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model'); // Import the Product model

// Initialize the Express app
const app = express()

// Use the JSON middleware to parse incoming request bodies
app.use(express.json());

// Define the root route
app.get('/', (req, res) => {
    res.send('Hello from node API');
});

//get all products
app.get('/api/getall', async (req, res) => {

    try {
        const products = await Product.find({});
        res.status(200).json(products)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// get a product
app.get('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Define the route to create a new product
app.post('/api/add', async (req, res) => {
    try {
        // Create a new product using the Product model
        const product = await Product.create(req.body);
        // Send the created product as a JSON response
        res.status(201).json(product);
    } catch (error) {
        // Send a 500 Internal Server Error response with the error message
        res.status(500).json({message: error.message});
    }
});

// update a product
app.put('/api/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            res.status(404).json({ message: "Product not found" });
        }
            const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//delete a product
app.delete('/api/delete/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json({message: "Product deleted succesfully"})
} catch (error) {
    res.status(500).json({ message: error.message });
}
});



mongoose.connect('mongodb+srv://tonigrondahl:PY5Iawq1CZSbqQE6@backenddb.malctez.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB')
  .then(() => {
    // Start the server when the database connection is successful
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
    console.log('Connected to the database!');
})
.catch((error) => { // <- Pass the error to the catch block
    console.log("Connection failed!", error);
});

