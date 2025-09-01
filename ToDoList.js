import item from "./TodoItem.js";
export default class ToDoList {
  #tasks;
  constructor() {
    this.#tasks = [];
    this.taskList = document.getElementById("task-list");
    this.filterPriority = document.getElementById("filter-priority");
    this.loadTasks();
    this.displayTasks();
  }

  addTask(name, priority) {
    if (name.trim() === "") {
      alert("plese enter a task");
      return;
    }
    const task = new item(Date.now(), name.trim(), priority, false);
    this.#tasks.push(task);
    this.saveTasks();
    this.displayTasks();
  }
  saveTasks() {
    localStorage.setItem(
      "tasks",
      JSON.stringify(this.#tasks.map((t) => t.toJSON()))
    );
  }
  loadTasks() {
    if (localStorage.getItem("tasks") != null) {
      this.#tasks = JSON.parse(localStorage.getItem("tasks")).map(
        (t) => new item(t.id, t.name, t.priority, t.completed)
      );
    }
  }
  displayTasks(filter = "all") {
    const filtered =
      filter === "all"
        ? this.#tasks
        : this.#tasks.filter((t) => t.getPriority() === filter);
    const taskli = filtered
      .map(
        (t) => {
          const { id, name, priority, completed } = t.toJSON();
          return `
        <li class="task-item priority-${priority}" id="${id}">
            <input type="checkbox" id="${id}" class="task-checkbox" ${
          completed ? "checked" : ""
        }/>
            <span class="task ${completed ? "completed" : ""}">${name}</span>
            <span>${priority.toUpperCase()}</span>
            <button class="edit-task" ${
              completed ? "disabled" : ""
            }>Edit</button>
            <button class="delete">X</button>
        </li>
    `;
        }
      )
      .join("");
    this.taskList.innerHTML = taskli;
  }}

