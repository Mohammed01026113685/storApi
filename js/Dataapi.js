function fetchProducts(category) {
    clearProducts();
    const apiUrl = `https://fakestoreapi.com/products/category/${category}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch products. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayProducts(data))
        .catch(error => console.error(error));
}

function fetchAllProducts() {
    clearProducts();
    const apiUrl = `https://fakestoreapi.com/products`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch products. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayProducts(data))
        .catch(error => console.error(error));
}

function clearProducts() {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
}

// خارج نطاق الدالة displayProducts
const cart = [];

function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    products.forEach(product => {
        const { id, title, price, description, image } = product;
        const productElement = document.createElement('div');
        productElement.innerHTML = `
        <div class="card" style="width: 18rem; height: 27rem; border: none;">
              <img  src="${image}" class="card-img-top card-img" alt="...">
              <div class="card-body ">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <b class="card-prise">${price}$</b>
               </div>
              <button class="btoa" data-product-id="${id}">show Product</button>
        </div>
        `;

        // إضافة مستمع حدث إلى زر "Add to Cart"
        const addToCartButton = productElement.querySelector('.btoa');
        addToCartButton.addEventListener('click', function() {
            showProductDetails(id);
        });

        productsContainer.appendChild(productElement);
    });
}

function showProductDetails(productId) {
    // قم بتنفيذ الكود اللازم لعرض تفاصيل المنتج
    // يمكنك تحميل صفحة جديدة أو استخدام عنصر منبثق (modal) أو غيرها من الطرق
    // في هذا المثال، نقوم بتحميل صفحة جديدة باستخدام window.location
    window.location.href = `prodact.html?productId=${productId}`;
}
// ... باقي الشيفرة ...



// Example of usage:
// fetchAllProducts();
// Fetch all products when the page loads
window.onload = function() {
    fetchAllProducts();
}