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
let saveContent = ""

function addGood(index) {
    let div1 = document.createElement("div");
    div1.className = "cart__product";
    div1.setAttribute("data-id", products[index].getAttribute("data-id"));
    
    let icon = document.createElement("img");
    icon.className = "cart__product-image";
    icon.src = img[index].src;
    icon.alt = img[index].alt;

    let div2 = document.createElement("div");
    div2.className = "cart__product-count";
    div2.textContent = quantity[index].textContent

    let a = document.createElement("a");
    a.className = "cart__product_delete";
    a.href = "#";
    a.innerHTML = "&times;";

    basket.appendChild(div1);
    div1.appendChild(icon);
    div1.appendChild(div2);
    div1.appendChild(a);

    // del product from basket
    a.addEventListener("click", () =>{
        console.log(div2.textContent);
        div1.remove();
        if (!basketProducts.length) cart.style.display = "none";
        dataSave();
    });
};

//clear all
btnClear.addEventListener("click", () => {
    basket.innerHTML = "";
    cart.style.display = "none";
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
        
        if (!basketProducts.length) {
            addGood(i);
        } else {
            let counter = 0;
            for (let el of basketProducts) {
                if (products[i].getAttribute("data-id") === el.getAttribute("data-id")) {
                    el.firstChild.nextSibling.textContent = Number(el.firstChild.nextSibling.textContent) + Number(quantity[i].textContent);
                    counter++;
                };
            };
            if (!counter) addGood(i);

        };
        dataSave();
    });
};

//save basket items after reload
function dataSave() {
    saveContent = basket.innerHTML;
    let toLoad = JSON.stringify(saveContent);
    localStorage.setItem("toLoad2", toLoad);
};

window.addEventListener("load", () => {
    basket.innerHTML = JSON.parse(localStorage.getItem("toLoad2"));
    if (!basketProducts.length) cart.style.display = "none";
});
