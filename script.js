let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    let left = document.createElement("div");
    left.style.display = "flex";
    left.style.alignItems = "center";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => toggleTask(index);

    let span = document.createElement("span");
    span.textContent = task.text;
    span.className = "task-text";
    if (task.completed) span.classList.add("completed");

    span.style.marginLeft = "10px";

    left.appendChild(checkbox);
    left.appendChild(span);

    let actions = document.createElement("div");
    actions.className = "actions";

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit";
    editBtn.onclick = () => editTask(index);

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(index);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(left);
    li.appendChild(actions);

    list.appendChild(li);
  });

  updateStats();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") {
    alert("Task cannot be empty!");
    return;
  }

  tasks.push({ text, completed: false });
  input.value = "";

  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  let newText = prompt("Edit your task:", tasks[index].text);

  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function updateStats() {
  let total = tasks.length;
  let completed = tasks.filter(t => t.completed).length;

  document.getElementById("total").textContent = `Total: ${total}`;
  document.getElementById("completed").textContent = `Completed: ${completed}`;
  document.getElementById("pending").textContent = `Pending: ${total - completed}`;
}

renderTasks();