const links = document.querySelectorAll(".has-tooltip");

//create tips elements
for (let i=0; i<links.length; i++) {
    let div = document.createElement("div");
    div.className = "tooltip";
    div.textContent = links[i].title
    div.setAttribute("data-position", "bottom"); // bottom top right left
    links[i].insertAdjacentElement("afterend", div);
};

const tips = document.querySelectorAll(".tooltip");

//show tips on click
for (let i=0; i<links.length; i++) {
    links[i].onclick =(() => {
        if (links[i].nextElementSibling.className == "tooltip tooltip_active") {
            links[i].nextElementSibling.className = "tooltip";
        } else {
            if (document.querySelector(".tooltip.tooltip_active")) {
                document.querySelector(".tooltip.tooltip_active").className = "tooltip";
            };
            links[i].nextElementSibling.className += " tooltip_active";
            tipsPosition (links[i].nextElementSibling, links[i]);
        };

        return false;
    });
};

function tipsPosition (tip, tipLink) {
    let { top, bottom, left, right} = tipLink.getBoundingClientRect();
    let active = document.querySelector(".tooltip.tooltip_active");

    switch (tip.getAttribute("data-position")) {
        case "bottom":
            tip.style.left = left + 'px';
            tip.style.top = bottom + 2 + 'px';
            break;
        case "top":
            tip.style.left = left + 'px';
            tip.style.top = top - 35 + 'px';
            break;
        case "right":
            tip.style.left = right + 2 + 'px';
            tip.style.top = top - 5 + 'px';
            break;
        case "left":
            tip.style.left = left - tip.offsetWidth - 4 + 'px';
            tip.style.top = top - 5 + 'px';
            break;
    };
};

// close tips on scroll
window.addEventListener("scroll", () => {
    if (document.querySelector(".tooltip.tooltip_active")) {
        document.querySelector(".tooltip.tooltip_active").className = "tooltip";
    };
});
