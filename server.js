const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model'); // Import the Product model

// Initialize the Express app
const app = express()

// Use the JSON middleware to parse incoming request bodies
app.use(express.json());

//routes 
app.use("/api/products", productRoute);



// Define the root route
app.get('/', (req, res) => {
    res.send('Hello from node API');
})


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

