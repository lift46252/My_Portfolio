const STATUS_COMPLETED = 1, 
    STATUS_UNCOMPLETED = 0;

const todoInput = document.querySelector('.todo-input'),
      todoButton = document.querySelector('.todo-button'),
      todoList = document.querySelector('.todo-list'),
      filterOption = document.querySelector('.filter-todo');
    // event listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

function addTodo(event) {
    event.preventDefault();
    // const
    const todoDiv = document.createElement("div"),
          newTodo = document.createElement("li"),
          completedButton = document.createElement("button"),
          trashButton = document.createElement("button");
    // todo div
    todoDiv.classList.add("todo");
    // create li
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // local storage todos
    saveLocalTodos({title: todoInput.value, status: STATUS_UNCOMPLETED});
    // check mark button
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // check trash button
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // append  to todoList
    todoList.appendChild(todoDiv);
    // clear input value
    todoInput.value = "";
}
    // delete and check function 
function deleteCheck(e) {
    const item = e.target;
    const todo = item.parentElement;
    const todoTitle = todo.children[0].innerText;

    if (item.classList[0] === 'trash-btn') {
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }


    if (item.classList[0] === 'complete-btn') {
        if (todo.classList.contains('completed')){
            updateTodoStatusInLocalStorage(todoTitle, STATUS_COMPLETED, STATUS_UNCOMPLETED);
        } else {
            updateTodoStatusInLocalStorage(todoTitle, STATUS_UNCOMPLETED, STATUS_COMPLETED);
        }

        todo.classList.toggle("completed");
    }   
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex"; 
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex"; 
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex"; 
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    })
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
        console.log(todos);
    }
    todos.forEach((todo) => {
        // const
        const todoDiv = document.createElement("div"),
        newTodo = document.createElement("li"),
        completedButton = document.createElement("button"),
        trashButton = document.createElement("button");
        // todo div
        todoDiv.classList.add("todo");

        if(todo['status'] === STATUS_COMPLETED){
            todoDiv.classList.add('completed');
        }

        // create li
        newTodo.innerText = todo.title;    
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // check mark button
        completedButton.innerHTML = '<i class="fas fa-check"><?/i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // check trash button
        trashButton.innerHTML = '<i class="fas fa-trash"><?/i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        // append  to todoList
        todoList.appendChild(todoDiv);
    });
}
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function updateTodoStatusInLocalStorage(title, oldStatus, newStatus){
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    let updated = todos.map(t => {
        if(t.title == title && t.status == oldStatus){
            return {title: title, status: newStatus};
        }
        return t;
    });

    localStorage.setItem("todos", JSON.stringify(updated));
}