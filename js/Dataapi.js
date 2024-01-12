// Constants for API URLs
const apiUrl = 'https://fakestoreapi.com/products';
const categoryApiUrl = 'https://fakestoreapi.com/products/category/';

// DOM elements
const productsContainer = document.getElementById('products-container');
const container = document.getElementById('container');
const loader = document.getElementById('loader');

// Page initialization
document.addEventListener('DOMContentLoaded', function() {
    showLoader();
    hideContent();

    // Set a timeout to show the loader after a certain delay (you can adjust this delay)
    setTimeout(function() {
        fetchAllProducts();
    }, 1000); // Simulating a potential network delay, adjust as needed
});

// Fetch products based on category
function fetchProducts(category) {
    clearProducts();
    fetchAndDisplayProducts(categoryApiUrl + category);
}

// Fetch all products
function fetchAllProducts() {
    clearProducts();
    fetchAndDisplayProducts(apiUrl);
}

// Clear the products container
function clearProducts() {
    productsContainer.innerHTML = '';
}

// Fetch and display products from the API
function fetchAndDisplayProducts(url) {
    showLoader();

    const startTime = new Date().getTime();

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch products. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const endTime = new Date().getTime();
            const elapsedTime = endTime - startTime;

            // Show the loader only if the response time exceeds a certain threshold
            if (elapsedTime > 5) { // Adjust the threshold as needed
                setTimeout(function() {
                    displayProducts(data);
                    hideLoader();
                    showContent();
                }, 1); // Simulating a potential network delay, adjust as needed
            } else {
                displayProducts(data);
                hideLoader();
                showContent();
            }
        })
        .catch(error => {
            console.error(error);
            hideLoader();
            showContent();
        });
}

// Show loader
function showLoader() {
    loader.style.display = 'flex';
}

// Hide loader
function hideLoader() {
    loader.style.display = 'none';
}

// Hide content
function hideContent() {
    container.style.display = 'none';
}

// Show content
function showContent() {
    container.style.display = 'block';
}

// Display products in the container
function displayProducts(products) {
    products.forEach(product => {
        const { id, title, price, description, image } = product;
        const productElement = document.createElement('div');
        productElement.innerHTML = `
            <div class="card" style="width: 18rem; height: 27rem; border: none;">
                <img src="${image}" class="card-img-top card-img" alt="...">
                <div class="card-body ">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description}</p>
                    <b class="card-prise">${price}$</b>
                </div>
                <button class="btoa" data-product-id="${id}">show Product</button>
            </div>
        `;

        // Add event listener to "show Product" button
        const addToCartButton = productElement.querySelector('.btoa');
        addToCartButton.addEventListener('click', function() {
            showProductDetails(id);
        });

        productsContainer.appendChild(productElement);
    });
}

// Show product details (e.g., navigate to a new page)
function showProductDetails(productId) {
    window.location.href = `prodact.html?productId=${productId}`;
}