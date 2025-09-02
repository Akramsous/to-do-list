import item from "./todoitem.js";

export default class ToDoList {
  #tasks;

  constructor() {
    this.#tasks = [];
    this.loadTasks();
  }
  addTask(name, priority) {
    const task = new item(Date.now(), name.trim(), priority, false);
    this.#tasks.push(task);
    this.saveTasks();
    this.displayTasks();
  }
  editTask(id, name, priority) {
    const task = this.#tasks.find((t) => t.getId() === id);
    if (task) {
      task.setName(name);
      task.setPriority(priority);
    }
    this.saveTasks();
  }
 //save tasks function which saves tasks to local storage
  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.#tasks));
  }
  //load tasks function which lowads tasks from liocal storage to #tasks array
  loadTasks() {
    if (localStorage.getItem("tasks") != null) {
      this.#tasks = JSON.parse(localStorage.getItem("tasks")).map(
        (t) => new item(t.id, t.name, t.priority, t.completed)
      );
    }
  }
 //delete task function which deletes task from #tasks array by id then saves changes to local storage
  deleteTask(id) {
    this.#tasks = this.#tasks.filter((t) => t.getId() != id);
    this.saveTasks();
  }
  //mark tasks completed
  markCompleted(id, completed) {
    const task = this.#tasks.find((t) => t.getId() === id);
    if (task) {
      task.setCompleted(completed);
      this.saveTasks();
    }
  }
  // display tasks and while adding tasks it also adds event listeners
  displayTasks() {
    const filterPriority = document.getElementById("filter-priority");
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    const tasks =
      filterPriority.value === "all"
        ? this.#tasks
        : this.#tasks.filter((t) => t.getPriority() === filterPriority.value);

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = `task-item priority-${task.getPriority()}`;
      //checkbox
      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.className = "task-checkbox";
      checkBox.checked = task.isCompleted();
      //task name span
      const spanTask = document.createElement("span");
      spanTask.className = `task${task.isCompleted() ? " completed" : ""}`;
      spanTask.textContent = task.getName();
      //save button creating
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.className = "save-btn d-none";
      //cancel button creating
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.className = "cancel-btn d-none";
      //edit button creating
      const editBtn = document.createElement("button");
      editBtn.className = "edit-task";
      editBtn.textContent = "Edit";
      if (task.isCompleted()) editBtn.classList.add("completed");
      //delete button creating
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete";
      deleteBtn.textContent = "X";
      deleteBtn.addEventListener("click", () => {
        this.deleteTask(task.getId());
        this.displayTasks();
      });
      //checkbox event listener
      checkBox.addEventListener("change", () => {
        this.markCompleted(task.getId(), checkBox.checked);
        this.displayTasks();
      });
      //edit button event listener
      editBtn.addEventListener("click", () => {
        if (task.isCompleted()) return;
        saveBtn.classList.remove("d-none");
        cancelBtn.classList.remove("d-none");
        editBtn.classList.add("d-none");
        deleteBtn.classList.add("d-none");
        spanTask.contentEditable = "plaintext-only";
        spanTask.focus();
        spanTask.classList.add("editting-span")
      });
      //save button event listener
      saveBtn.addEventListener("click", () => {
        this.editTask(task.getId(), spanTask.textContent.trim(), task.getPriority());
        saveBtn.classList.add("d-none");
        cancelBtn.classList.add("d-none");
        editBtn.classList.remove("d-none");
        deleteBtn.classList.remove("d-none");
        spanTask.contentEditable = false;
        spanTask.classList.remove("editting-span");
        this.displayTasks();
      });
      //cancel button event listener
      cancelBtn.addEventListener("click", () => {
        spanTask.textContent = task.getName();
        saveBtn.classList.add("d-none");
        cancelBtn.classList.add("d-none");
        editBtn.classList.remove("d-none");
        deleteBtn.classList.remove("d-none");
        spanTask.classList.remove("editting-span");
        spanTask.contentEditable = false;
      });
     //append all elements to li
      li.append(checkBox, spanTask, saveBtn, cancelBtn, editBtn, deleteBtn);
      //append li into ul list
      taskList.appendChild(li);
    });
  }
}
