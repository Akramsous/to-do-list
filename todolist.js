import item from "./todoitem.js";
export default class ToDoList {
  #tasks;

  constructor() {
    this.#tasks = [];
    this.loadTasks();
  }
  addTask(e, name, priority) {
    e.preventDefault();
    if (name.trim() === "") {
      alert("plese enter a task");
      return;
    }
    const task = new item(Date.now(), name.trim(), priority, false);
    this.#tasks.push(task);
    this.saveTasks();
  }
  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.#tasks));
  }
  loadTasks() {
    if (localStorage.getItem("tasks") != null) {
      this.#tasks = JSON.parse(localStorage.getItem("tasks")).map(
        (t) => new item(t.id, t.name, t.priority, t.completed)
      );
    }
  }
  getTasks() {
    return this.#tasks;
  }
  deleteTask(id) {
    this.#tasks = this.#tasks.filter((t) => t.getId() != id);
    this.saveTasks();
  }
}
