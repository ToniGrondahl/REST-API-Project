const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

// routes
app.use("/api/getall", productRoute);

// add a product
app.use("/api/add", productRoute);

// get a product by id
app.use("/api/product/:id", productRoute);

// update product by id
app.use("/api/update/:id", productRoute);

// delete product by id
app.use("/api/delete/:id", productRoute);


// Define the root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});


mongoose.connect('mongodb+srv://tonigrondahl:PY5Iawq1CZSbqQE6@backenddb.malctez.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB')
  .then(() => {
    // Start the server when the database connection is successful
    app.listen(port, () => {
        console.log(`Server is running on port 3000 ${port}`);
    });
    console.log('Connected to the database!');
})
.catch((error) => { // <- Pass the error to the catch block
    console.log("Connection failed!", error);
});
