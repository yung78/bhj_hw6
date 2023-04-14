const links = document.querySelectorAll(".has-tooltip");

//create tips elements
for (let i=0; i<links.length; i++) {
    let div = document.createElement("div");
    div.className = "tooltip";
    div.textContent = links[i].title
    div.setAttribute("data-position", "bottom"); // bottom top right left
    links[i].insertAdjacentElement("afterend", div);
};

const tips = document.getElementsByClassName("tooltip");

//show tips on click
for (let i=0; i<links.length; i++) {
    links[i].onclick =(() => {
        if (document.querySelector(".tooltip.tooltip_active")) {
            document.querySelector(".tooltip.tooltip_active").className = "tooltip";
        };
        tips[i].className += " tooltip_active";

        let { top, bottom, left, right} = links[i].getBoundingClientRect();
        let active = document.querySelector(".tooltip.tooltip_active")

        switch (active.getAttribute("data-position")) {
            case "bottom":
                active.style.left = left + 'px';
                active.style.top = bottom + 2 + 'px';
                break;
            case "top":
                active.style.left = left + 'px';
                active.style.top = top - 35 + 'px';
                break;
            case "right":
                active.style.left = right + 2 + 'px';
                active.style.top = top - 5 + 'px';
                break;
            case "left":
                active.style.left = left - active.offsetWidth - 4 + 'px';
                active.style.top = top - 5 + 'px';
                break;
        };

        return false;
    });
};

// close tips on scroll
window.addEventListener("scroll", () => {
    if (document.querySelector(".tooltip.tooltip_active")) {
        document.querySelector(".tooltip.tooltip_active").className = "tooltip";
    };
});
