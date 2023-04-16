const cart = document.querySelector(".cart")
const basket = document.querySelector(".cart__products");
const basketProducts = document.getElementsByClassName("cart__product");
const products = document.querySelectorAll(".product");
const plus = document.querySelectorAll(".product__quantity-control.product__quantity-control_inc");
const minus = document.querySelectorAll(".product__quantity-control.product__quantity-control_dec");
const quantity = document.querySelectorAll(".product__quantity-value");
const add = document.querySelectorAll(".product__add");
const img = document.querySelectorAll(".product__image");
const btnClear = document.querySelector(".cart__clear");
let saveContent = [];

function addGood(id, src, count) {
    let div = document.createElement("div");
    div.className = "cart__product";
    div.setAttribute("data-id", id);
    div.innerHTML = `
    <img class="cart__product-image" src=${src}>
    <div class="cart__product-count">${count}</div>
    <a href="#" class="cart__product_delete">&times;</a>
    `;

    basket.appendChild(div);
    saveContent.push({
        "id": id,
        "src": src,
        "quantity": count
    });

    // del product from basket
    div.querySelector("a").addEventListener("click", () =>{
        for (let i=0; i<saveContent.length; i++) {
            if (saveContent[i].id == div.getAttribute("data-id")) {
                saveContent.splice(i, 1);
            };
        };

        div.remove();

        if (!basketProducts.length) cart.style.display = "none";
        dataSave();
    });
};

//clear all
btnClear.addEventListener("click", () => {
    basket.innerHTML = "";
    cart.style.display = "none";

    saveContent = []
    dataSave();
});


for (let i=0; i<plus.length; i++) {
    //change quantity
    plus[i].addEventListener("click", () => {
        quantity[i].textContent = Number(quantity[i].textContent) + 1;
    });
    minus[i].addEventListener("click", () => {
        quantity[i].textContent = Number(quantity[i].textContent)<2 ? 1 : Number(quantity[i].textContent) - 1;
    });

    // add product into basket
    add[i].addEventListener("click", () => {
        document.querySelector(".cart").style.display = "block";
        let id = products[i].getAttribute("data-id");
        let src = img[i].src;
        let count =  Number(quantity[i].textContent)
        
        // let product = Array.of(basketProducts).find((el) => el.getAttribute("data-id") == id); // ПОЧЕМУ-ТО РУГАЕТСЯ НА getAttribute("data-id")
        let index = saveContent.findIndex((el) => el.id == id);
        if (index < 0) {
            addGood(id, src, count);
        } else {
            basketProducts[index].querySelector("div").textContent = Number(basketProducts[index].querySelector("div").textContent) + count;
            for (let obj of saveContent) {
                if (obj.id == id) obj.quantity = Number(obj.quantity) + count;
            };
        };
        dataSave();
    });
};

//save basket items after reload
function dataSave() {
    // console.log(Array.from(basketProducts)[0].getAttribute("data-id")); //а тут без проблем вы водит ...
    let toLoad = JSON.stringify(saveContent);
    localStorage.setItem("toLoad2", toLoad);
};

window.addEventListener("load", () => {
    let loadItem = JSON.parse(localStorage.getItem("toLoad2"));
    for (el of loadItem) {
        addGood(el.id, el.src, el.quantity);
    };
    if (!basketProducts.length) cart.style.display = "none";
});
