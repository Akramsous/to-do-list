import ToDoList from "./todolist.js";
const taskInput = document.querySelector(".task-input");
const taskPriority = document.querySelector(".task-priority");
const addBtn = document.querySelector(".add-task-button");
const taskList = document.getElementById("task-list");
const filterPriority = document.getElementById("filter-priority");
let toDoList = new ToDoList();
let editingTask = null;
const cancelBtn = document.createElement("button");
cancelBtn.textContent = "Cancel";
cancelBtn.style.display = "none";
cancelBtn.className = "cancel-edit"; 
addBtn.insertAdjacentElement("afterend", cancelBtn);

const displayTasks = (filter = "all") => {
  const tasks = toDoList.getTasks();
  const filtered =
    filter === "all" ? tasks : tasks.filter((t) => t.getPriority() === filter);

  taskList.innerHTML = "";
  filtered.forEach((task) => {
    const li = document.createElement("li");
    li.className = `task-item priority-${task.getPriority()}`;
    li.id = task.getId();

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.isCompleted();

    const spanTask = document.createElement("span");
    spanTask.className = `task${task.isCompleted() ? " completed" : ""}`;
    spanTask.textContent = task.getName();

    const spanPriority = document.createElement("span");
    spanPriority.textContent = task.getPriority().toUpperCase();

    const editBtn = document.createElement("button");
    editBtn.className = "edit-task";
    editBtn.textContent = "Edit";
    if (task.isCompleted()) editBtn.disabled = true;

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

addBtn.addEventListener("click", (e) => {
  const taskName = taskInput.value;
  const priority = taskPriority.value;
  if (editingTask) {
    editingTask.setName(taskName);
    editingTask.setPriority(priority);
    editingTask = null;
    addBtn.textContent = "Add Task";
    cancelBtn.style.display = "none";
  } else {
    toDoList.addTask(e, name, priority);
  }

  taskInput.value = "";
  displayTasks(filterPriority.value);
});
cancelBtn.addEventListener("click", () => {
  editingTask = null;
  taskInput.value = "";
  addBtn.textContent = "Add Task";
  cancelBtn.style.display = "none";
});

filterPriority.addEventListener("change", () => {
  displayTasks(filterPriority.value);
});

taskList.addEventListener("click", (e) => {
  const target = e.target;

  const li = target.closest("li.task-item");
  if (!li) return;

  const taskId = li.id;
  const task = toDoList.getTasks().find((t) => t.getId() == taskId);

  if (target.classList.contains("task-checkbox") || target.tagName === "SPAN") {
    task.setCompleted(!task.isCompleted());
    toDoList.saveTasks();
    displayTasks(filterPriority.value);
  }

  if (target.classList.contains("delete")) {
    toDoList.deleteTask(taskId);
    displayTasks();
  }
  if (target.classList.contains("edit-task")) {
    taskInput.value = task.getName();
    taskPriority.value = task.getPriority();
    editingTask = task;
    addBtn.textContent = "Save";
    cancelBtn.style.display = "inline-block";
  }
});
displayTasks();
