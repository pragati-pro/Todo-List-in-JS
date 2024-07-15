const store = {
    todos: [
        {
            id: "1",
            title: "Watching TV",
            completed: false
        },
        {
            id: "2",
            title: "Create JS Project",
            completed: true
        },
        {
            id: "3",
            title: "Deployment Task",
            completed: false
        }
    ]
}

const storeHandler = {
    get(target, property) {
        return target[property]; // target => store
    },
    set(target, property, value) {
        target[property] = value;
        if (property === "todos") {
            window.dispatchEvent(new Event("todosChange"))
        }
        localStorage.setItem("store", JSON.stringify(store));
        return true;
    }
}

// proxy supports only objects
const storeProxy = new Proxy(store, storeHandler);

function addTodo(newTodo) {
    storeProxy.todos = [...storeProxy.todos, newTodo];
}

function deleteTodo(id) {
    storeProxy.todos = storeProxy.todos.filter(todo => todo.id !== id);
}

function changeCompletedStatus(id, completedStatus) {
    storeProxy.todos = storeProxy.todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: completedStatus }
        } else {
            return todo;
        }
    });
}

export {
    storeProxy,
    addTodo,
    deleteTodo,
    changeCompletedStatus
};