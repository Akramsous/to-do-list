import ToDoList from "./todolist.js";
const taskInput = document.querySelector(".task-input");
const taskPriority = document.querySelector(".task-priority");
const addBtn = document.querySelector(".add-task-button");
const taskList = document.getElementById("task-list");
const filterPriority = document.getElementById("filter-priority");

const toDoList = new ToDoList();
let editingTask = null;
const cancelBtn = document.createElement("button");
cancelBtn.textContent = "Cancel";
cancelBtn.className = "cancel-edit";
cancelBtn.style.display = "none";
addBtn.insertAdjacentElement("afterend", cancelBtn);

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  editingTask = null;
  taskInput.value = "";
  addBtn.textContent = "Add Task";
  cancelBtn.style.display = "none";
  taskInput.required = true;
  taskPriority.required = true;
});

const displayTasks = () => {
  const filter = filterPriority.value;
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
    if (task.isCompleted()) {
      editBtn.classList.add("completed");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", (e) => {
      toDoList.deleteTask(task.getId());
      displayTasks();
    });
    checkbox.addEventListener("change", () => {
      task.setCompleted(checkbox.checked);
      toDoList.saveTasks();
      displayTasks();
    });
    editBtn.addEventListener("click", () => {
      if (task.isCompleted()) return;
      editingTask = task;
      taskInput.value = task.getName();
      taskPriority.value = task.getPriority();
      addBtn.textContent = "Save";
      cancelBtn.style.display = "inline-block";
      taskInput.required = false;
      taskPriority.required = false;
    });

    li.appendChild(checkbox);
    li.appendChild(spanTask);
    li.appendChild(spanPriority);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
};
displayTasks();

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const taskName = taskInput.value;
  const priority = taskPriority.value;
  taskInput.required = true;
  taskPriority.required = true;

  if (editingTask) {
    editingTask.setName(taskName);
    editingTask.setPriority(priority);
    editingTask = null;
    addBtn.textContent = "Add Task";
    cancelBtn.style.display = "none";
    toDoList.saveTasks();
  } else toDoList.addTask(e, taskName, priority);
  taskInput.value = "";
  
  displayTasks();
});

filterPriority.addEventListener("change", () => {
  displayTasks();
});
