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
});

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

// add to cart 
const cart = [];

function addToCart(productDetails) {
    // افحص إذا كانت عربة التسوق تحتوي بالفعل على هذا المنتج
    const existingProduct = cart.find(item => item.id === productDetails.id);

    if (existingProduct) {
        // إذا كان المنتج موجود بالفعل في عربة التسوق، قم بزيادة كمية المنتج
        existingProduct.quantity += 1;
    } else {
        // إذا لم يكن المنتج موجودًا، أضفه إلى عربة التسوق
        // تأكد من أن السعر هو رقم قبل إضافته
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
            console.error(`خطأ: لا يمكن إضافة المنتج إلى عربة التسوق. السعر غير صحيح.`);
            console.log('تفاصيل المنتج:', productDetails);
            return;
        }
    }

    updateCartUI();
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
                
                <div>
                    <b>Total: $${itemPrice.toFixed(2)}</b>
                </div>
            </ui>`;

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
}

function decreaseQuantity(itemId) {
    const item = cart.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateCartUI();
    }
}

function increaseQuantity(itemId) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += 1;
        updateCartUI();
    }
}