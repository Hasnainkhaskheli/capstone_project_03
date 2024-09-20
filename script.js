document.getElementById("background").style.background = "aliceblue";

// Select all 'Add to Cart' buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const emptyCartContent = document.getElementById("emptyCartContent");
const cartItemCount = document.getElementById("cartItemCount");
const totalPriceContainer = document.getElementById("totalPriceContainer");
const totalPriceElement = document.getElementById("totalPrice");

// Counter for the number of items in the cart
let itemCount = 0;
let totalPrice = 0;

// Add event listener to each 'Add to Cart' button
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get the parent carousel item (or card)
    const parentElement =
      button.closest(".carousel-item") || button.closest(".card");

    // Get product details from data attributes
    const productName = parentElement.getAttribute("data-name");
    const productPrice = parseFloat(parentElement.getAttribute("data-price"));

    // Create a new cart item element
    const cartItem = document.createElement("div");
    cartItem.classList.add(
      "cart-item",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "my-2"
    );

    // Set initial quantity to 1
    let itemQuantity = 1;

    cartItem.innerHTML = `
            <span>${productName}</span>
            <div class="quantity-control d-flex align-items-center">
                <button class="btn btn-sm btn-secondary decrease-quantity">-</button>
                <span class="mx-2" id="quantityDisplay">1</span>
                <button class="btn btn-sm btn-secondary increase-quantity">+</button>
            </div>
            <span class="item-price">$${productPrice.toFixed(2)}</span>
            <button class="btn btn-sm btn-danger remove-item">Remove</button>
        `;

    // Add the cart item to the cart items container
    cartItemsContainer.appendChild(cartItem);

    // Increment the item count
    itemCount++;
    updateCartCount();

    // Update the total price
    totalPrice += productPrice;
    updateTotalPrice();

    // Hide the empty cart message
    emptyCartContent.style.display = "none";

    // Show the total price container
    totalPriceContainer.style.display = "block";

    // Add quantity control functionality
    const quantityDisplay = cartItem.querySelector("#quantityDisplay");
    const increaseQuantityBtn = cartItem.querySelector(".increase-quantity");
    const decreaseQuantityBtn = cartItem.querySelector(".decrease-quantity");
    const removeButton = cartItem.querySelector(".remove-item");

    increaseQuantityBtn.addEventListener("click", () => {
      itemQuantity++;
      quantityDisplay.textContent = itemQuantity;
      totalPrice += productPrice;
      updateTotalPrice();
    });

    decreaseQuantityBtn.addEventListener("click", () => {
      if (itemQuantity > 1) {
        itemQuantity--;
        quantityDisplay.textContent = itemQuantity;
        totalPrice -= productPrice;
        updateTotalPrice();
      }
    });

    // Add remove button functionality
    removeButton.addEventListener("click", () => {
      totalPrice -= productPrice * itemQuantity;
      cartItem.remove();
      itemCount--;
      updateCartCount();
      updateTotalPrice();

      // Check if the cart is empty again
      if (cartItemsContainer.querySelectorAll(".cart-item").length === 0) {
        emptyCartContent.style.display = "block";
        totalPriceContainer.style.display = "none";
      }
    });
  });
});

// Function to update the cart item count
function updateCartCount() {
  if (itemCount > 0) {
    cartItemCount.style.display = "inline-block";
    cartItemCount.textContent = itemCount;
  } else {
    cartItemCount.style.display = "none";
  }
}

// Function to update the total price
function updateTotalPrice() {
  totalPriceElement.textContent = totalPrice.toFixed(2);
}

