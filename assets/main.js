const taskinput= document.querySelector('.task-input');
const taskpriority= document.querySelector('.task-priority');
const addbtn= document.querySelector('.add-task-button');
const tasklist= document.getElementById('task-list');
const filterpriority= document.getElementById('filter-priority');
let tasks=[];
if (localStorage.getItem('tasks') != null){
    tasks=JSON.parse(localStorage.getItem('tasks'));
    displayTasks();
}
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
addbtn.addEventListener('click',(e)=>addTask(e));
function addTask(e){
    e.preventDefault();
    
    if(taskinput.value.trim() ===''){
        alert('plese enter a task');
        
        return;}

    const task={
        id :Date.now(),
        name: taskinput.value.trim(),
        priority: taskpriority.value,
        completed: false
    }
    tasks.push(task);
    saveTasks();
    taskinput.value='';
    displayTasks();
}
filterpriority.addEventListener('change', () => {
    displayTasks(filterpriority.value);
});

function displayTasks(filter = "all") {
    const filtered = filter === "all" ? tasks : tasks.filter(t => t.priority === filter);

    const taskli = filtered.map(({id, name, priority, completed}) => `
        <li class="task-item priority-${priority}" id="${id}">
            <input type="checkbox" id="${id}" class="task-checkbox" ${completed ? 'checked' : ''}/>
            <span class="task ${completed ? 'completed' : ''}">${name}</span>
            <span>${priority.toUpperCase()}</span>
            <button class="edit-task" ${completed ? 'disabled' : ''}>Edit</button>
            <button class="delete">X</button>
        </li>
    `).join('');

    tasklist.innerHTML = taskli;
   
}
tasklist.addEventListener("click", (e) => {
    const target = e.target;
    
    const li = target.closest("li.task-item");
    if (!li) return; 

    const taskId = li.id;
    const task = tasks.find(t => t.id == taskId);

    
    if (target.classList.contains("task-checkbox") || target.tagName === "SPAN") {
        task.completed = !task.completed;
        saveTasks();
        displayTasks(filterpriority.value);
    }

   
    if (target.classList.contains("delete")) {
        tasks = tasks.filter(t => t.id != taskId);
        saveTasks();
        displayTasks(filterpriority.value);
    }
});

