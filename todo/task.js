const input = document.querySelector(".tasks__input");
const taskList = document.querySelector(".tasks__list");
const btnAdd = document.querySelector(".tasks__add");
const tasks = document.getElementsByClassName("task");
let docSave = "";

function createElement(text) {
    
    let div1 = document.createElement("div");
    div1.className = "task";

    let div2 = document.createElement("div");
    div2.className = "task__title";
    div2.textContent = text;

    let a = document.createElement("a");
    a.href = "#";
    a.className = "task__remove";
    a.innerHTML = "&times;";

    taskList.appendChild(div1);
    div1.appendChild(div2);
    div1.appendChild(a);

    // delete element
    let delElement = div1.querySelector(".task__remove");
    delElement.addEventListener("click", () => {
        div1.remove();

        dataSave();
    });

    dataSave();
};

function saveElement(e) {
    if (input.value !== "") { 
        createElement(input.value);
        input.value = ""
    };

    e.preventDefault();
};


//save Enter-key
input.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') saveElement(e);
});

//save btn-click
btnAdd.addEventListener("click", (e) => {
    saveElement(e);
});

//save content after reload
function dataSave() {
    docSave = taskList.innerHTML;
    let toLoad = JSON.stringify(docSave);
    localStorage.setItem("toLoad", toLoad);
};

window.addEventListener("load", () => {
    taskList.innerHTML = JSON.parse(localStorage.getItem("toLoad"));
    const tasksBegin = document.getElementsByClassName("task");
    const delElemBegin = document.getElementsByClassName("task__remove");
    
    // Пытался повесить обработчик на удаление после обновления
    // не получилось - не срослось)
    // if (tasksBegin.length) {
    //     for (let i=0; i<tasksBegin.length; i++) {
    //         delElemBegin[i].addEventListener ("click", () => {
    //             tasksBegin[i].remove();
    //         });
    //     };
    // };
});

//delete all notes/tasks
document.querySelector(".tasks__remove__all").addEventListener("click", (e) => {
    taskList.innerHTML = "";
    
    e.preventDefault();
    dataSave()
});
