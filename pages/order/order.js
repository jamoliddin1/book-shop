const bodyEl = document.body;
const documentFragment = document.createDocumentFragment();
// header tag
const headerEl = document.createElement("div");
headerEl.className = "main-header";

// a tag
const aLeftEl = document.createElement('a');
const aRightEl = document.createElement('a');

// a left (title)
aLeftEl.setAttribute('href', '../main/index.html');
const title = document.createElement('h2');
title.textContent = 'Bookshop';
aLeftEl.appendChild(title);

// a right (cart)
aRightEl.setAttribute('href', 'order.html');
aRightEl.insertAdjacentHTML('afterbegin', `
    <div class="shopping-cart-amount">
        <i class="fa-solid fa-cart-shopping"></i>
	      <div id="shopping-amount" class="shopping-amount">0</div>
    </div>
`);

// appending to header
headerEl.append(aLeftEl, aRightEl);
documentFragment.appendChild(headerEl);
bodyEl.insertBefore(documentFragment, bodyEl.firstChild);

const label = document.createElement('div');
label.className = 'text-center';
const bookCart = document.getElementById('book-cart')

let basket = JSON.parse(localStorage.getItem('bookshop products')) || [];

const calcProd = () => {
  const amountAllProd = document.getElementById("shopping-amount");
  amountAllProd.innerHTML = basket.map((el) => el.item).reduce((prev, curr) => curr + prev, 0)
}

calcProd()

const generateCartItems = () => {
  if (basket.length !== 0) {
    return bookCart.innerHTML = basket.map((el) => {
      console.log(el)
      let { id, item } = el;
      let search = bookshopData.find((dataId) => dataId.id === id) || []
      console.log(search)
      let { imageLink, title, author, price } = search;
      return `
        <div class="cart-item">
         <img width="100" src=${imageLink} alt="">
         <div class="info">

          <div class="title-price-x">
            <h4 class="title-price">
              <p>${title}</p>
              <p class="cart-item-price">$ ${price}</p>
            </h4>
            <i onclick="removeItem(${id})" class="fa-solid fa-xmark x-icon"></i>

          </div>

          <em>${author}</em>
          
          <div class="price-amount">
              <i onclick="decrement(${id})" class="icon-minus fa-solid fa-minus"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="icon-plus fa-solid fa-plus"></i>
          </div>

          <h3>$ ${item * search.price}</h3>
         </div>
        </div>
      `
    }).join('')
  } else {
    bookCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="../main/index.html">
      <button class="home-btn">Back to main page</button>
    </a>
    `
  }
}

generateCartItems();

const increment = (id) => {
  let selectedItem = id;
  let searchItem = basket.find((el) => el.id === selectedItem.id)

  if (searchItem === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1
    })
  } else {
    searchItem.item += 1
  }

  generateCartItems()
  update(selectedItem.id)

  localStorage.setItem("bookshop products", JSON.stringify(basket))
};

const decrement = (id) => {
  let selectedItem = id;
  let searchItem = basket.find((el) => el.id === selectedItem.id)

  if (searchItem === undefined) return;
  else if (searchItem.item === 0) return;
  else {
    searchItem.item -= 1;
  }

  update(selectedItem.id)

  basket = basket.filter((el) => el.item !== 0)

  generateCartItems()

  localStorage.setItem("bookshop products", JSON.stringify(basket))
};

const update = (id) => {
  let searchItemNum = basket.find((el) => el.id === id)
  // console.log(searchItemNum.item)

  document.getElementById(id).innerHTML = searchItemNum.item
  calcProd()
  totalAmount()
};

const removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id)
  basket = basket.filter((el) => el.id !== selectedItem.id)
  generateCartItems()
  totalAmount()
  calcProd()
  localStorage.setItem("bookshop products", JSON.stringify(basket))
}

const totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket.map((el) => {
      let { item, id } = el
      let search = bookshopData.find((dataId) => dataId.id === id) || [];
      return item * search.price;
    }).reduce((prev, curr) => prev + curr, 0)
    // console.log(amount)
    label.innerHTML = `
      <h2>Total Bill : $ ${amount}</h2>
      <button class="checkout-btn"><a href="../form/confirm-form.html">Confirm order</a></button>
      <button onclick="clearCart()" class="remove-all-btn">Clear cart</button>
    `
  }
  else return
}

totalAmount()

headerEl.after(label);

const clearCart = () => {
  basket = [];
  generateCartItems()
  calcProd()
  localStorage.setItem("bookshop products", JSON.stringify(basket))
}
