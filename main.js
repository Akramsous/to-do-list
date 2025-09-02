import ToDoList from "./todolist.js";
const taskInput = document.querySelector(".task-input");
const taskPriority = document.querySelector(".task-priority");
const addBtn = document.querySelector(".add-task-button");
const filterPriority = document.getElementById("filter-priority");

const toDoList = new ToDoList();
toDoList.displayTasks();


addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const taskName = taskInput.value.trim();
  const priority = taskPriority.value;
  if(taskName.trim()==="")
  {
    alert("Task name cannot be empty");
    return;
  }
  taskInput.required = true;
  taskPriority.required = true;
  toDoList.addTask(taskName, priority);
  taskInput.value = "";
 
});

filterPriority.addEventListener("change", () => {
  toDoList.displayTasks();
});
