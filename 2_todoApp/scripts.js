const todoInput = document.querySelector("#todoInput");
const todoButton = document.querySelector("#todoButton");
const todoList = document.querySelector("#todo-lists");
const todoCount = document.querySelector("#todo-count");
const progressBar = document.querySelector("#progress-bar");
const currentProgress = document.querySelector("#current-progress");

//save to local storage
const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const addTodo = (todo) => {
  const todoText = todoInput.value.trim();
  if (todoText) {
    todos.push({ title: todoText, completed: false });
    todoInput.value = "";
    renderTodos();
    displayStats();
    saveToLocalStorage();
  }
};

const renderTodos = () => {
  //   console.log(todos);
  todoList.innerHTML = "";

  // loop through todos
  todos.forEach((todo, index) => {
    const listItem = document.createElement("li");
    const todoDiv = document.createElement("div");
    const checkBox = document.createElement("input");
    const spanText = document.createElement("span");

    // button div
    const btnDiv = document.createElement("div");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const editImg = document.createElement("img");
    const dltImg = document.createElement("img");

    // appending checkbox and todo to div
    spanText.textContent = todo.title;
    spanText.id = index;
    spanText.classList.add(
      "text-white",
      "ml-5",
      "flex-1",
      "font-serif",
      "text-xl"
    );
    console.log(todo);

    if (todo.completed) {
      spanText.classList.add("line-through", "text-green-500");
    } else {
      spanText.classList.remove("line-through", "text-green-500");
    }
    checkBox.type = "checkbox";
    checkBox.checked = todo.completed;
    checkBox.classList.add("ml-5", "h-5", "w-5");

    todoDiv.classList.add("w-full", "flex", "h-auto", "items-center", "p-2");
    todoDiv.appendChild(checkBox);
    todoDiv.appendChild(spanText);

    // appending edit and delete buttons to button div
    editImg.src = "./images/edit.png";
    dltImg.src = "./images/bin.png";

    editImg.classList.add("h-6", "w-6");
    dltImg.classList.add("h-6", "w-6", "mr-3");
    btnDiv.classList.add("ml-auto", "flex", "space-x-2", "items-center");

    editBtn.appendChild(editImg);
    deleteBtn.appendChild(dltImg);
    btnDiv.appendChild(editBtn);
    btnDiv.appendChild(deleteBtn);

    // add eventListerner to edit and delete buttons
    deleteBtn.addEventListener("click", () => deleteTodo(index));
    editBtn.addEventListener("click", () =>
      updateTodo(index, todoDiv, spanText, editImg)
    );
    // add eventListener to checkbox
    checkBox.addEventListener("change", (e) => {
      todo.completed = e.target.checked;

      saveToLocalStorage();
      displayStats();
      if (e.target.checked) {
        spanText.classList.add("line-through", "text-green-500");
      } else {
        spanText.classList.remove("line-through", "text-green-500");
      }
    });

    //appednging text and checkbox div to li
    listItem.classList.add(
      "w-full",
      "items-center",
      "my-4",
      "rounded-lg",
      "bg-purple-900"
    );
    listItem.appendChild(todoDiv);

    // appending button div to div then li
    todoDiv.appendChild(btnDiv);

    todoList.appendChild(listItem);
  });
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  saveToLocalStorage();
  renderTodos();
  displayStats();
};

const updateTodo = (index, todoDiv, spanText, editImg) => {
  const editInput = document.createElement("input");
  editInput.value = todos[index].title;
  editInput.classList.add(
    "ml-2",
    "border-white-800",
    "border-2",
    "bg-purple-900",
    "h-10",
    "w-auto",
    "rounded-lg",
    "px-10",
    "text-white",
    "mr-2"
  );

  const checkBox = todoDiv.querySelector("input[type='checkbox']");
  checkBox.disabled = true;

  todoDiv.replaceChild(editInput, spanText);

  editImg.src = "./images/save.png";

  editImg.addEventListener("click", () => {
    todos[index] = {
      title: editInput.value,
      completed: todos[index].completed,
    };
    renderTodos();
    saveToLocalStorage();
  });
};

const displayStats = () => {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;

  // Handle division by zero when there is no todo
  const progressPercentage =
    total > 0 ? Math.floor((completed / total) * 100) : 0;

  console.log(total + " " + completed);

  currentProgress.style.width = `${progressPercentage}%`;
  todoCount.textContent = `${completed} / ${total}`;
};

todoButton.addEventListener("click", addTodo);

const todos = JSON.parse(localStorage.getItem("todos")) || [];

console.log(todos);

// call renderTodos when page loads()
displayStats();
renderTodos();
