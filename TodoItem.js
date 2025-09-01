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

    setName(name) {
        this.#name = name;
    }

    setPriority(priority) {
        this.#priority = priority;
    }

    toggleCompleted() {
        this.#completed = !this.#completed;
    }

    getId() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    getPriority() {
        return this.#priority;
    }

    isCompleted() {
        return this.#completed;
    }

    
    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            priority: this.#priority,
            completed: this.#completed
        };
    }
}
