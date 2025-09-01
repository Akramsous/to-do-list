export default class TodoItem {
  #id;
  #name;
  #priority;
  #completed;

  constructor(id, name, priority, completed = false) {
    this.#id = id;
    this.#name = name;
    this.#priority = priority;
    this.#completed = completed;
  }
}
