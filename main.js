const taskInput = document.querySelector(".task-input");
const taskPriority = document.querySelector(".task-priority");
const addBtn = document.querySelector(".add-task-button");
const taskList = document.getElementById("task-list");
const filterPriority = document.getElementById("filter-priority");
let tasks = [];
if (localStorage.getItem("tasks") != null) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  displayTasks();
}
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
addBtn.addEventListener("click", (e) => addTask(e));
const addTask = (e) => {
  e.preventDefault();

  if (taskInput.value.trim() === "") {
    alert("plese enter a task");
    return;
  }

  const task = {
    id: Date.now(),
    name: taskInput.value.trim(),
    priority: taskPriority.value,
    completed: false,
  };
  tasks.push(task);
  saveTasks();
  taskInput.value = "";
  displayTasks();
};
filterPriority.addEventListener("change", () => {
  displayTasks(filterPriority.value);
});

const displayTasks = (filter = "all") => {
  const filtered =
    filter === "all" ? tasks : tasks.filter((t) => t.priority === filter);
  taskList.innerHTML = "";
  filtered.forEach(({ id, name, priority, completed }) => {
    const li = document.createElement("li");
    li.className = `task-item priority-${priority}`;
    li.id = id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    checkbox.className = "task-checkbox";
    checkbox.checked = completed;

    const spanTask = document.createElement("span");
    spanTask.className = `task${completed ? " completed" : ""}`;
    spanTask.textContent = name;

    const spanPriority = document.createElement("span");
    spanPriority.textContent = priority.toUpperCase();

    const editBtn = document.createElement("button");
    editBtn.className = "edit-task";
    editBtn.textContent = "Edit";
    if (completed) editBtn.disabled = true;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "X";

    li.appendChild(checkbox);
    li.appendChild(spanTask);
    li.appendChild(spanPriority);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
};
taskList.addEventListener("click", (e) => {
  const target = e.target;

  const li = target.closest("li.task-item");
  if (!li) return;

  const taskId = li.id;
  const task = tasks.find((t) => t.id == taskId);

  if (target.classList.contains("task-checkbox") || target.tagName === "SPAN") {
    task.completed = !task.completed;
    saveTasks();
    displayTasks(filterpriority.value);
  }

  if (target.classList.contains("delete")) {
    tasks = tasks.filter((t) => t.id != taskId);
    saveTasks();
    displayTasks(filterPriority.value);
  }
});
