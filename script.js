// Preview the uploaded product image
function previewImage(event) {
  const imageBox = document.querySelector('.product-image');
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      imageBox.src = e.target.result;
    }
    reader.readAsDataURL(file);
  }
}

// Load products from localStorage
function loadProducts() {
  return JSON.parse(localStorage.getItem('products')) || [];
}

// Save products to localStorage
function saveProducts(products) {
  localStorage.setItem('products', JSON.stringify(products));
}

// Add a new product
function addProduct() {
  const name = document.getElementById('productName').value;
  const quantity = document.getElementById('productQuantity').value;
  const expiry = document.getElementById('productExpiry').value;
  const barcode = document.getElementById('productBarcode').value;
  const image = document.getElementById('file-upload').files[0];

  if (!name || !quantity || !expiry || !barcode) {
    alert('Please fill in all required fields.');
    return;
  }

  const products = loadProducts();

  // Convert image to base64
  if (image) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const newProduct = {
        id: Date.now(),  // Unique product ID
        name,
        quantity,
        expiry,
        barcode,
        image: e.target.result  // Base64 encoded image
      };

      products.push(newProduct);
      saveProducts(products);

      alert('Product added successfully!');
      displayProducts();
      
      // Reset the form
      document.getElementById('productName').value = '';
      document.getElementById('productQuantity').value = '';
      document.getElementById('productExpiry').value = '';
      document.getElementById('productBarcode').value = '';
      document.getElementById('file-upload').value = '';
      document.querySelector('.product-image').src = 'https://placehold.co/200x200';  // Placeholder image reset
    };
    reader.readAsDataURL(image);
  } else {
    alert('Please upload a product image.');
  }
}

// Fill the Add Product form with product details
function fillProductForm(product) {
  document.getElementById('productName').value = product.name;
  document.getElementById('productQuantity').value = product.quantity;
  document.getElementById('productBarcode').value = product.barcode;
  
  // Show countdown instead of the expiry date
  displayCountdown(product.expiry);
}

// Display all products dynamically on the homepage
function displayProducts() {
  const products = loadProducts();
  const productList = document.querySelector('.projects-container');
  productList.innerHTML = '';  // Clear previous products

  if (products.length === 0) {
    productList.innerHTML = '<p>No products available.</p>';
    return;
  }

  products.forEach((product) => {
    const productItem = document.createElement('div');
    productItem.className = 'project-item';

    const img = document.createElement('img');
    img.src = product.image || 'https://placehold.co/200x200';
    img.alt = product.name;

    const overlay = document.createElement('div');
    overlay.className = 'project-overlay';
    const title = document.createElement('h3');
    title.textContent = product.name;

    // Add countdown paragraph
    const countdownParagraph = document.createElement('p');
    countdownParagraph.id = `countdown-${product.id}`;

    // Add button to show countdown (outside the overlay)
    const countdownButton = document.createElement('button');
    countdownButton.textContent = 'Show Countdown';
    countdownButton.classList.add('countdown-btn'); // Add a class for styling
    countdownButton.onclick = function() {
      startCountdown(product.id, countdownParagraph.id);
    };

    // Add click functionality to view product details (inside the overlay)
    overlay.addEventListener('click', function() {
      window.location.href = `product-detail.html?id=${product.id}`;  // Pass the product ID in the URL
    });

    // Append elements to the product item
    overlay.appendChild(title);
    productItem.appendChild(img);
    productItem.appendChild(overlay);
    productItem.appendChild(countdownParagraph);  // Append countdown paragraph
    productItem.appendChild(countdownButton);     // Append countdown button (outside overlay)
    
    productList.appendChild(productItem);
  });
}

// Start countdown for product expiry
function startCountdown(id, countdownId) {
  const products = loadProducts();
  const product = products.find(p => p.id == id); // Find the product by ID
  const countdownContainer = document.getElementById(countdownId);

  const now = new Date();
  const timeDiff = new Date(product.expiry) - now;

  if (timeDiff < 0) {
    countdownContainer.innerHTML = 'Expired';
    return;
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  countdownContainer.innerHTML = `Days: ${days}, Hours: ${hours}`;
}

// Run this function when the page loads
window.onload = displayProducts;



function deleteNotification(notificationId) {
  // Get the notification element by its ID
  var notification = document.getElementById(notificationId);
  
  // Remove the notification element from the DOM
  notification.remove();
}



