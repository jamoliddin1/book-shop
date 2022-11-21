const bodyEl = document.body;
const documentFragment = document.createDocumentFragment();
// header tag
const headerEl = document.createElement("div");
headerEl.className = "main-header";

// a tag
const aLeftEl = document.createElement('a');
const aRightEl = document.createElement('a');

// a left (title)
aLeftEl.setAttribute('href', 'index.html');
const title = document.createElement('h2');
title.textContent = 'Bookshop';
aLeftEl.appendChild(title);

// a right (cart)
aRightEl.setAttribute('href', '../order/order.html');
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

const bookshopItems = document.getElementById("bookshop-items");

let basket = JSON.parse(localStorage.getItem("bookshop products")) || [];

const generateBook = () => {
  return bookshopItems.innerHTML = bookshopData.map(eachEl => {
    const { id, author, imageLink, title, price, description } = eachEl;
    const searchId = basket.find(el => el.id === id) || [];
    return `
    <div id=prod-id-${id} class="book-item">
    <img width="220" src=${imageLink} alt="book-1">
    <div class="info">
      <h3 class="info-title">${title}</h3>
      <p class="info-author">${author}</p>
      <div class="price-part">
        <h2 class="price">$ ${price}</h2>
        <div class="price-amount">
          <i onclick="decrement(${id})" class="icon-minus fa-solid fa-minus"></i>
          <div id=${id} class="quantity">
          ${searchId.item === undefined ? 0 : searchId.item}
          </div>
          <i onclick="increment(${id})" class="icon-plus fa-solid fa-plus"></i>
        </div>
      </div>
    </div>
  </div>
    `
  }).join("")
}

generateBook()

const increment = (id) => {
  const selectedItem = id;
  const searchItem = basket.find(el => el.id === selectedItem.id);

  if (searchItem === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1
    })
  } else {
    searchItem.item += 1
  }

  update(selectedItem.id)

  localStorage.setItem("bookshop products", JSON.stringify(basket))
};

const decrement = (id) => {
  const selectedItem = id;
  const searchItem = basket.find(el => el.id === selectedItem.id)

  if (searchItem === undefined) return;
  else if (searchItem.item === 0) return;
  else {
    searchItem.item -= 1;
  }

  update(selectedItem.id)

  basket = basket.filter(el => el.item !== 0);

  console.log(basket);
  localStorage.setItem("bookshop products", JSON.stringify(basket))
};

const update = (id) => {
  const searchItemNum = basket.find(el => el.id === id)
  console.log(searchItemNum.item)

  document.getElementById(id).innerHTML = searchItemNum.item
  calcProd()
}

const calcProd = () => {
  const amountAllProd = document.getElementById("shopping-amount")
  amountAllProd.innerHTML = basket.map((el) => el.item).reduce((prev, curr) => curr + prev, 0)
}

calcProd()

