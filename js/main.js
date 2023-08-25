let basket = JSON.parse(localStorage.getItem("data"))
  ? JSON.parse(localStorage.getItem("data"))
  : [];

let shop = document.getElementById("shop");
let generateShop = () => {
  return products.map((product) => {
    let search = basket.find((x) => x.id === product.id) || [];
    return (shop.innerHTML += ` 
  <div class="con col-lg-4 col-md-6 col-12" id="pro-${product.id}">
        <div class="card">
                <div class="img">
                    <img src=${product.img} alt="">
                </div>
                <h3>${product.name}</h3>
                <p class="desc">${product.desc}</p>
                <div class="price-quantity">
                    <h2 class="price">$${product.price}</h2>
                    <div class="quantity">
                        <button class="sub" onclick="DecrementFunc(${
                          product.id
                        })">-</button>
                        <span class="counter" id="counter-${product.id}" >
                        ${search.item === undefined ? 0 : search.item}
                        </span>
                        <button class="add" onclick="IncrementFunc(${
                          product.id
                        })">+</button>
                    </div>
                </div>
            </div>
        </div>
  `);
  });
};
generateShop();

function IncrementFunc(id) {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);
  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  // console.log(basket);

  UpdateFunc(selectedItem);
  localStorage.setItem("data", JSON.stringify(basket));
}
function DecrementFunc(id) {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);
  if (search === undefined) return;
  else {
    if (search.item === 0) {
      search.item = 0;
    } else {
      search.item -= 1;
    }
  }
  // console.log(basket);
  UpdateFunc(selectedItem);

  basket = basket.filter((x) => x.item !== 0);

  localStorage.setItem("data", JSON.stringify(basket));
}
function UpdateFunc(id) {
  let search = basket.find((x) => x.id === id);
  document.getElementById(`counter-${id}`).innerHTML = search.item;
  calculation();
}
function calculation() {
  let counterHead = document.getElementById("counterHead");
  let sum = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  counterHead.innerHTML = sum;
}
calculation();
