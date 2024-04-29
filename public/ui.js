         
         // Fetch data from API
          fetch('http://localhost:3000/api/getall')
            .then(response => response.json())
            .then(products => {
                // Generate HTML for each product
                const productRows = products.map(product => `
                    <tr>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td>${product.quantity}</td>
                        <td>
                        <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                        <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                        <td>
                    </tr>
                `);

                // Append product rows to table body
                document.getElementById('productTableBody').innerHTML = productRows.join('');
            })
            .catch(error => console.error('Error fetching products:', error));


        // After successfully adding a product, fetch the latest product list and update the UI
const fetchAndDisplayProducts = () => {
    fetch('/api/getall')
        .then(response => response.json())
        .then(products => {
            // Update the UI to display the latest product list
            const productListDiv = document.getElementById("productTableBody");
            productListDiv.innerHTML = ""; // Clear previous product list
            products.forEach(product => {
                const productItem = document.createElement("div");
                productItem.textContent = `${product.name} - ${product.price} - ${productQuantity}`;
                productListDiv.appendChild(productItem);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            // Optionally, show an error message
        });
};

        document.getElementById("addProductForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent default form submission

            // Get form data
            const productName = document.getElementById("productName").value;
            const productQuantity = document.getElementById("productQuantity").value;
            const productPrice = document.getElementById("productPrice").value;

            // Create product object
            const productData = {
                name: productName,
                quantity: productQuantity,
                price: productPrice
            };

            // Make AJAX POST request to API endpoint
            fetch('/api/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            })
            .then(response => response.json())
            .then(data => {
                // Handle response
                console.log(data); // Log response from the server
                // Optionally, update UI or show a success message
            })
            .catch(error => {
                console.error('Error:', error);
                // Optionally, show an error message
            });
        });


        function validateForm() {
            var name = document.getElementById("productName").value;
            var price = document.getElementById("productPrice").value;
            var quantity = document.getElementById("productQuantity").value;
        
            if (name.trim() == "" || price.trim() == "" || quantity.trim() == "") {
                alert("Please fill out all fields!");
                return false;
            }
            return true;
        }


        //                     // Edit button click event
// document.querySelectorAll('.edit').forEach((btn, index) => {
//     btn.addEventListener('click', function(event) {
//         event.preventDefault();

//         // Fetch the product data from the table row
//         const productName = document.querySelectorAll('#productTableBody td:nth-child(1)')[index].textContent;
//         const productPrice = document.querySelectorAll('#productTableBody td:nth-child(2)')[index].textContent;
//         const productQuantity = document.querySelectorAll('#productTableBody td:nth-child(3)')[index].textContent;

//         // Populate the form fields with the product data
//         document.getElementById('productName').value = productName;
//         document.getElementById('productPrice').value = productPrice;
//         document.getElementById('productQuantity').value = productQuantity;

//         // Store the ID of the product to be edited (you might need to have IDs in your tab
//         const productId = ""; // You need to fetch the product ID from your data structure

//         // Update form submission to handle edit
//         document.getElementById('addProductForm').addEventListener('submit', function(event) {
//             event.preventDefault();
            
//             // Get updated form data
//             const updatedProductName = document.getElementById('productName').value;
//             const updatedProductPrice = document.getElementById('productPrice').value;
//             const updatedProductQuantity = document.getElementById('productQuantity').value;

//             // Make AJAX PUT request to update product
//             fetch(`/api/update/${productId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     name: updatedProductName,
//                     price: updatedProductPrice,
//                     quantity: updatedProductQuantity
//                 })
//             })
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data); // Log response from the server
//                 // Optionally, update UI or show a success message
//                 fetchAndDisplayProducts(); // Refresh product list after update
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//                 // Optionally, show an error message
//             });
//         });
//     });
// }); 

// // Delete button click event
// document.querySelectorAll('.delete').forEach((btn, index) => {
//     btn.addEventListener('click', function(event) {
//         event.preventDefault();

//         // Fetch the product ID from the table row
//         const productId = ""; // You need to fetch the product ID from your data structure

//         // Make AJAX DELETE request to delete product
//         fetch(`/api/delete/${productId}`, {
//             method: 'DELETE'
//         })
//         .then(response => {
//             if (response.ok) {
//                 // Optionally, update UI to remove the deleted product
//                 document.querySelectorAll('#productTableBody tr')[index].remove();
//             } else {
//                 console.error('Error deleting product:', response.status);
//                 // Optionally, show an error message
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             // Optionally, show an error message
//         });
//     });
// });