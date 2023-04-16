const input = document.querySelector(".tasks__input");
const taskList = document.querySelector(".tasks__list");
const btnAdd = document.querySelector(".tasks__add");
const tasks = document.getElementsByClassName("task");
let textSaveArr = [];

function createElement(text) {

    let div = document.createElement("div");
    div.className = "task";
    div.innerHTML = `
    <div class="task__title">
        ${text}
    </div>
    <a href="#" class="task__remove">&times;</a>
    `;

    taskList.appendChild(div);

    // delete element
    let delElement = div.querySelector(".task__remove");
    delElement.addEventListener("click", () => {
        div.remove();
        let index = textSaveArr.indexOf(text);
        textSaveArr.splice(index, 1);
        dataSave();
    });

    textSaveArr.push(text)
    dataSave();
};

function saveElement(e) {
    if (input.value.trim() !== "") { 
        createElement(input.value);
        input.value = ""
    };

    e.preventDefault();
};

//save 
btnAdd.addEventListener("click", (e) => {
    saveElement(e);
});

//save content after reload
function dataSave() {
    let toLoad = JSON.stringify(textSaveArr);
    localStorage.setItem("toLoad", toLoad);
};

window.addEventListener("load", () => {
    let unpack = JSON.parse(localStorage.getItem("toLoad"));
    for (let el of unpack){
        createElement(el)
    }
});

//delete all notes/tasks
document.querySelector(".tasks__remove__all").addEventListener("click", (e) => {
    taskList.innerHTML = "";
    textSaveArr = [];
    
    e.preventDefault();
    dataSave()
});
