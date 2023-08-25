let label = document.getElementById("label");
let shoppingCart = document.getElementById("shoppingCart");

let basket = JSON.parse(localStorage.getItem("data"))
  ? JSON.parse(localStorage.getItem("data"))
  : [];
console.log(basket);
function calculation() {
  let counterHead = document.getElementById("counterHead");
  let sum = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  counterHead.innerHTML = sum;
}
calculation();

function generateCartItems() {
  shoppingCart.innerHTML = "";
  if (basket.length !== 0) {
    return basket.map((x) => {
      let search = products.find((y) => y.id === x.id) || [];
      return (shoppingCart.innerHTML += `
        <div class="itemCart">
                <div class="img">
                    <img src="${search.img}"/>
                </div>           
                <div class="details">
                <div class="det1">
                    <span class="proName">${search.name}</span>
                    <span class="proPrice">${search.price}</span>
                    <i class="fa-solid fa-xmark proRemove" id="proRemove"
                    onclick="removeItem(${x.id})"></i>
                </div>
                <div class="quantity">
                        <button class="sub" onclick="DecrementFunc(${
                          x.id
                        })">-</button>
                        <span class="counter" id="counter-${x.id}" >
                        ${x.item}
                        </span>
                        <button class="add" onclick="IncrementFunc(${
                          x.id
                        })">+</button>
                </div>
                 <h3 class="det3">
                   $${search.price * x.item}
                </h3>
            </div>
        </div>
      `);
    });
  } else {
    shoppingCart.innerHTML = ``;
    console.log("object");
    label.innerHTML = `
    <h2 class="empty">Cart is empty !</h2>
    <a href="index.html" class="BackBtn">Back To Home</a>
    
    `;
  }
}
generateCartItems();
let calc = "";
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
  generateCartItems();
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

  UpdateFunc(selectedItem);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
}
function UpdateFunc(id) {
  let search = basket.find((x) => x.id === id);
  document.getElementById(`counter-${id}`).innerHTML = search.item;
  calculation();
  TotalBill();
}
function calculation() {
  let counterHead = document.getElementById("counterHead");
  let sum = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  counterHead.innerHTML = sum;
}
calculation();
function removeItem(id) {
  basket = basket.filter((x) => x.id !== id);
  generateCartItems();
  TotalBill();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
}
let totalPrice = document.getElementById("totalPrice");

function TotalBill() {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let search = products.find((y) => y.id === x.id) || [];
        return search.price * x.item;
      })
      .reduce((sum, x) => sum + x, 0);
    // console.log(amount);
    totalPrice.innerHTML = `Total Bill : ${amount}`;
  } else {
  }
}
TotalBill();

let removeAll = document.getElementById("removeAll");
removeAll.addEventListener("click", (e) => {
  basket = [];
  localStorage.setItem("data", JSON.stringify(basket));
  generateCartItems();
  calculation();
});
