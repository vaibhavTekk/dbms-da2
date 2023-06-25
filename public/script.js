// Store items and cart
let items = [{id:"1",name: "Hello", price:"34"}];
let cart = [];

// Item class
// class Item {
//   constructor(name, price) {
//     this.name = name;
//     this.price = price;
//   }
// }

// Function to render the items list
function renderItems() {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = '';
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - $${item.price}`;
      const addButton = document.createElement('button');
      addButton.textContent = 'Add to Cart';
      addButton.addEventListener('click', () => addToCart(item));
      li.appendChild(addButton);
      itemList.appendChild(li);
    });
  }
// Function to render the cart
function renderCart() {
  const cartList = document.getElementById('cart-list');
  cartList.innerHTML = '';

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const itemNameInput = document.getElementById('item-name');
  const itemPriceInput = document.getElementById('item-price');

  const name = itemNameInput.value;
  const price = parseFloat(itemPriceInput.value);

  if (name && price) {
    item = {name, price}
    items.push(item);
    renderItems();
    itemNameInput.value = '';
    itemPriceInput.value = '';

    // Make API call to create a new item
    createItem(newItem);
  }
}

// Function to handle checkout
function handleCheckout() {
  cart = [];
  renderCart();
  alert('Checkout completed. Thank you!');

  // Make API call to checkout the cart
  checkoutCart();
}

// Function to create a new item via API
function createItem(item) {
  const url = '/items'; // Replace with your API endpoint

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Item created:', data);
    })
    .catch(error => {
      console.error('Error creating item:', error);
    });
}

function addToCart(item) {
    cart.push(item);
    renderCart();
}

// Function to checkout the cart via API
function checkoutCart() {
  const url = '/cart/checkout'; // Replace with your API endpoint

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cart),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Cart checked out:', data);
    })
    .catch(error => {
      console.error('Error checking out cart:', error);
    });
}

// Add event listeners
const addItemForm = document.getElementById('add-item-form');
addItemForm.addEventListener('submit', handleFormSubmit);

renderItems();

const checkoutBtn = document.getElementById('checkout-btn');
checkoutBtn.addEventListener('click', handleCheckout);