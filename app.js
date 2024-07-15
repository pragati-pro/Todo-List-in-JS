import {render} from "./render.js";
import {storeProxy, addTodo, deleteTodo, changeCompletedStatus} from "./store.js";

window.addEventListener("todosChange", () => {
    render();
});

// get store from localStorage:-
const storeData = localStorage.getItem("store");
const storeFromLocalStorage = JSON.parse(storeData);
if(storeFromLocalStorage?.todos.length) {
    storeProxy.todos = storeFromLocalStorage.todos;
} else {
    localStorage.setItem("store", JSON.stringify(storeProxy));
    render();
}

const form  = document.querySelector("#form");
const todoTitleInput = document.querySelector(".todo-title-input");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let todoInput = todoTitleInput.value;
    todoInput = todoInput.trim();
    if(todoInput.length) {
        const newTodo = { 
            id: crypto.randomUUID(),
            title: todoInput,
            completed: false
        }
        addTodo(newTodo);
        todoTitleInput.innerHTML = "";
    }
});

const todos = document.querySelector(".todos");
todos.addEventListener("click", (e) => {
    const target = e.target;
    if(target.classList.contains("delete-todo-button")){
        const li = target.closest(".todo");
        const li_id = li.dataset.id;
        deleteTodo(li_id);
    }
});

todos.addEventListener("change", (e) => {
    const target = e.target;
    if(target.classList.contains("todo-checkbox")) {
        const li = target.closest(".todo");
        const li_id = li.dataset.id;
        const completedStatus = target.checked;
        changeCompletedStatus(li_id, completedStatus);
    }
});