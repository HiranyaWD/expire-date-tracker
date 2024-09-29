document.addEventListener("DOMContentLoaded", function() {
    const productDetailsContainer = document.getElementById('productDetailsContainer');
    
    // Retrieve the selected product from localStorage
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

    if (selectedProduct) {
        // Display the product details
        const productDetails = `
            <div class="product-details-card">
                <img src="${selectedProduct.image}" alt="${selectedProduct.name}" class="product-image" width="200" />
                <h3>${selectedProduct.name}</h3>
                <p>Quantity: ${selectedProduct.quantity}</p>
                <p>Expiration: ${new Date(selectedProduct.expiration).toLocaleString()}</p>
                <p>Barcode: ${selectedProduct.barcode}</p>
            </div>
        `;
        productDetailsContainer.innerHTML = productDetails;

        // Handle the Edit button click
        document.getElementById('editProduct').addEventListener('click', function() {
            // Code to edit the product can go here
        });

        // Handle the Delete button click
        document.getElementById('deleteProduct').addEventListener('click', function() {
            // Retrieve all products from localStorage
            const productList = JSON.parse(localStorage.getItem('products')) || [];

            // Find the index of the selected product
            const productIndex = productList.findIndex(product => product.barcode === selectedProduct.barcode);

            // If the product exists, delete it
            if (productIndex !== -1) {
                productList.splice(productIndex, 1); // Remove the product from the array
                localStorage.setItem('products', JSON.stringify(productList)); // Update localStorage

                alert("Product deleted successfully!");
                window.location.href = 'index.html'; // Redirect to homepage
            } else {
                alert("Product not found.");
            }
        });
    } else {
        productDetailsContainer.innerHTML = "<p>No product selected.</p>";
    }
});
