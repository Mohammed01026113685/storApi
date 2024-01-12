document.addEventListener('DOMContentLoaded', function() {
    const productId = getProductIdFromUrl();
    getProductDetails(productId)
        .then(productDetails => {
            displayProductDetails(productDetails);

            const addToCartButton = document.getElementById('addToCart');
            addToCartButton.addEventListener('click', function() {
                addToCart(productDetails);
            });
        })
        .catch(error => console.error(error));

    // Load cart from local storage
    loadCartFromLocalStorage();

    // Create and append the cart item count element
    const cartItemCountElement = document.createElement('span');
    cartItemCountElement.id = 'cart-item-count';
    cartIcon.appendChild(cartItemCountElement);

    // Update the cart UI
    updateCartUI();
});


function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('productId');
}


function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('productId');
}

function getProductDetails(productId) {
    return fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch product details. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => data)
        .catch(error => console.error(error));
}

function displayProductDetails(productDetails) {
    const productTitle = document.getElementById('product-title');
    const productImage = document.getElementById('product-image');
    const productDescription = document.getElementById('product-description');
    const productPrice = document.getElementById('product-price');

    productTitle.textContent = productDetails.title;
    productImage.src = productDetails.image;
    productDescription.textContent = productDetails.description;
    productPrice.textContent = `$${productDetails.price}`;
}

// Cart functionality
const cart = [];
let totalCartItems = 0;

// Load cart item count from local storage
const savedTotalCartItems = localStorage.getItem('totalCartItems');
if (savedTotalCartItems) {
    totalCartItems = parseInt(savedTotalCartItems, 10);
}

function addToCart(productDetails) {
    const existingProduct = cart.find(item => item.id === productDetails.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        const price = parseFloat(productDetails.price);
        if (!isNaN(price)) {
            cart.push({
                id: productDetails.id,
                title: productDetails.title,
                image: productDetails.image,
                price: price,
                quantity: 1
            });
        } else {
            console.error(`Error: Cannot add the product to the cart. Invalid price.`);
            console.log('Product details:', productDetails);
            return;
        }
    }

    // Increment the totalCartItems variable
    totalCartItems += 1;

    // Save totalCartItems to local storage
    localStorage.setItem('totalCartItems', totalCartItems.toString());

    saveCartToLocalStorage();
    updateCartUI();
    updateCartItemCount();
}

function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        saveCartToLocalStorage();
        updateCartUI();
        updateCartItemCount();
    }
}

function decreaseQuantity(itemId) {
    const item = cart.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCartToLocalStorage();
        updateCartUI();
        updateCartItemCount();
    }
}

function increaseQuantity(itemId) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += 1;
        saveCartToLocalStorage();
        updateCartUI();
        updateCartItemCount();
    }
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));

}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
        cart.length = 0;
        const parsedCart = JSON.parse(savedCart);
        cart.push(...parsedCart);
    }
}
const cartIcon = document.querySelector("#cart-icon");
const cartd = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
    cartd.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cartd.classList.remove("active");
});

function updateCartUI() {
    const cartItemsList = document.getElementById('cart-items-list');
    const totalPriceElement = document.getElementById('total-price');
    const cartItemCountElement = document.getElementById('cartItemCount');

    cartItemsList.innerHTML = '';

    let totalCartPrice = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        const itemPrice = item.price * item.quantity;

        cartItemElement.innerHTML = `
            <div style="display: flex; flex-direction: row; marginTop: 50px">
                <img src="${item.image}" alt="" style="width: 250px; height: 150px">
                <div>
                    <h5>${item.title}</h5>
                    <b>$${item.price}</b>
                
                    <button class="decrement-btn" data-item-id="${item.id}">-</button>
                    <b class="quantity">${item.quantity}</b>
                    <button class="increment-btn" data-item-id="${item.id}">+</button>
                
                </div>
                <div>
                    <b>Total: $${itemPrice.toFixed(2)}</b>
                </div>
            </div>`;

        totalCartPrice += itemPrice;
        cartItemsList.appendChild(cartItemElement);

        const decrementButton = cartItemElement.querySelector('.decrement-btn');
        const incrementButton = cartItemElement.querySelector('.increment-btn');

        decrementButton.addEventListener('click', function() {
            decreaseQuantity(item.id);
        });

        incrementButton.addEventListener('click', function() {
            increaseQuantity(item.id);
        });


    });

    totalPriceElement.textContent = `Total Cart Price: $${totalCartPrice.toFixed(2)}`;

    // Update cart item count

}

function updateCartItemCount() {
    const cartItemCountElement = document.getElementById('cart-item-count');

    // Update the cart item count with the totalCartItems variable
    if (cartItemCountElement) {
        cartItemCountElement.textContent = totalCartItems.toString();
    }
}
// Add Clear Cart Button
// ... (الشيفرة السابقة)

// Add Clear Cart Button
const clearCartButton = document.getElementById('clear-cart');
clearCartButton.addEventListener('click', function() {
    clearCart();
});

function clearCart() {
    const confirmClear = confirm("Are you sure you want to clear the entire cart?");
    if (confirmClear) {
        // Reset the totalCartItems variable
        totalCartItems = 0;

        // Save the updated totalCartItems to local storage
        localStorage.setItem('totalCartItems', totalCartItems.toString());

        // Clear the cart array
        cart.length = 0;

        // Save the empty cart to local storage
        saveCartToLocalStorage();

        // Update the cart UI
        updateCartUI();

        // Update the cart item count
        updateCartItemCount();
    }
}
let Buy_Now = document.getElementById("Buy_Now");
Buy_Now = function() {
    window.alert("Your order has been placed successfully");
    totalCartItems = " ";

    // Save the updated totalCartItems to local storage
    localStorage.setItem('totalCartItems', totalCartItems.toString());

    // Clear the cart array
    cart.length = " ";

    // Save the empty cart to local storage
    saveCartToLocalStorage();

    // Update the cart UI
    updateCartUI();

    // Update the cart item count
    updateCartItemCount();


}