document.getElementById('task-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let title = document.getElementById('task-title').value;
    let desc = document.getElementById('task-desc').value;
    
    // Here you'd send this data to the server or store locally
    alert("Task Submitted: " + title);
    
    // Clear the form
    document.getElementById('task-form').reset();
});

// Sample data for tasks
let tasks = [
    {title: "Clean up the yard", description: "Rake the leaves and clean the front yard."},
    {title: "Code a website", description: "Create a website for a small business."}
];

// Function to dynamically add tasks to the page
function loadTasks() {
    let taskList = document.querySelector('.task-list');
    tasks.forEach(task => {
        let taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        taskCard.innerHTML = `<h3>${task.title}</h3><p>${task.description}</p><button>Select Task</button>`;
        taskList.appendChild(taskCard);
    });
}

document.addEventListener('DOMContentLoaded', loadTasks);
