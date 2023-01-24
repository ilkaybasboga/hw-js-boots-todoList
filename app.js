let form = document.getElementById("form");
let input = document.getElementById("input");
let addInput = document.getElementById("btn-add");
let clearInput = document.getElementById("btn-clear");
let secondCard = document.getElementById("second-card");
let firstCard = document.getElementById("first-card");

/* EVENTS */

form.addEventListener("submit", (e) => {
  let newTodo = input.value.trim();

  if (newTodo === "") {
    alert("danger","Please, Task Enter");
  } else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    alert("success","Task successfully added");

  }
  e.preventDefault();
});

clearInput.addEventListener("click", () => {
  clearAllTodos();
});
document.addEventListener("DOMContentLoaded",  () => {
    loadAllTodosToUI();
});
secondCard.addEventListener("click",  (e) => {
    deleteTodo(e);
});

/*Functions*/

function addTodoToUI(newTodo) {
  let li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between text-secondary fs-3 bg-body-secondary m-1 p-1";

  let a = document.createElement("a");
  a.href = "#";
  a.className = "delete-item";
  a.innerHTML = "<i class = 'fa fa-remove'></i>";

  li.appendChild(document.createTextNode(newTodo));
  li.appendChild(a);

  secondCard.prepend(li);

  input.value = "";
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodosFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function loadAllTodosToUI() {
  let todos = getTodosFromStorage();

  todos.forEach((todo) => {
    addTodoToUI(todo);
  });
}

function deleteTodo(e) {
    
  if (e.target.className=== "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodosFromStorage(e.target.parentElement.textContent);
  }
}

function deleteTodosFromStorage(delTodo) {
  let todos = getTodosFromStorage();

  todos.forEach(function (tododel, index) {
    if (tododel === delTodo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function clearAllTodos() {
    
  if (confirm("Are you sure?")) {
    while (secondCard.firstElementChild != null) {
      secondCard.removeChild(secondCard.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
}


function alert(type,message){
    const div=document.createElement("div")
    div.className=`alert alert-${type} mt-5`;
    div.textContent=message;

    firstCard.appendChild(div)

    setTimeout(function(){
        div.remove()
    },2000)
}