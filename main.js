document.getElementById("file-upload").addEventListener("change", function(event) {
    const imageBox = document.getElementById("productImage");
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageBox.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.querySelector(".submit-button").addEventListener("click", function() {
    const productName = document.querySelector('input[placeholder="Enter product name"]').value;
    const quantity = document.querySelector('input[placeholder="Enter quantity"]').value;
    const expirationDate = document.querySelector('input[type="datetime-local"]').value;
    const barcode = document.querySelector('input[placeholder="Enter barcode"]').value;
    const imageSrc = document.getElementById("productImage").src;

    if (!productName || !quantity || !expirationDate || !barcode || imageSrc.includes("placehold.co")) {
        alert("Please fill all fields and upload an image");
        return;
    }

    const newProduct = {
        name: productName,
        quantity: quantity,
        expiration: expirationDate,
        barcode: barcode,
        image: imageSrc
    };

    // Store in localStorage
    const productList = JSON.parse(localStorage.getItem('products')) || [];
    productList.push(newProduct);
    localStorage.setItem('products', JSON.stringify(productList));

    alert("Product added successfully!");
  
    // Optionally, redirect to the home page after adding the product
    window.location.href = 'index.html';
});
