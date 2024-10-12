let tasks = [];

document.getElementById('task-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('task-title').value;
    const desc = document.getElementById('task-desc').value;
    
    const task = {
        id: Date.now(), // Unique ID for each task
        title: title,
        description: desc,
        status: 'pending' // Default status
    };

    tasks.push(task); // Add task to the array
    renderTasks(); // Render tasks
    document.getElementById('task-form').reset(); // Clear the form
});

function renderTasks() {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = ''; // Clear previous tasks

    tasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.innerHTML = `
            <h4>${task.title}</h4>
            <p>${task.description}</p>
            <p>Status: <strong>${task.status}</strong></p>
            <button class="approve-button">Approve</button>
            <button class="reject-button">Reject</button>
            <button class="view-details">View Details</button>
        `;
        taskList.appendChild(taskCard);

        // Approve button functionality
        taskCard.querySelector('.approve-button').addEventListener('click', function () {
            task.status = 'approved';
            renderTasks(); // Re-render tasks after approval
            updateRewards(task.title); // Update rewards for approved tasks
        });

        // Reject button functionality
        taskCard.querySelector('.reject-button').addEventListener('click', function () {
            tasks = tasks.filter(t => t.id !== task.id); // Remove the task from the array
            renderTasks(); // Re-render tasks
        });

        // View details button functionality
        taskCard.querySelector('.view-details').addEventListener('click', function () {
            showModal(task);
        });
    });
}

function updateRewards(taskTitle) {
    const rewardList = document.querySelector('.reward-list');
    const rewardCard = document.createElement('div');
    rewardCard.className = 'reward-card';
    rewardCard.innerText = `You've earned a reward for completing: ${taskTitle}`;
    rewardList.appendChild(rewardCard);
}

// Modal functionality
function showModal(task) {
    const modal = document.getElementById('task-modal');
    const modalDescription = document.getElementById('modal-description');
    modalDescription.innerText = task.description; // Show task description
    modal.style.display = 'block'; // Show modal

    const closeModal = document.querySelector('.close');
    closeModal.onclick = function () {
        modal.style.display = 'none'; // Close modal
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none'; // Close modal on click outside
        }
    }
}

// Filter tasks in the admin section
document.getElementById('task-filter').addEventListener('change', function () {
    const filterValue = this.value;
    const taskReview = document.querySelector('.task-review');
    taskReview.innerHTML = ''; // Clear previous filtered tasks

    tasks.forEach(task => {
        if (filterValue === 'all' || task.status === filterValue) {
            const taskCard = document.createElement('div');
            taskCard.className = 'task-card';
            taskCard.innerHTML = `
                <h4>${task.title}</h4>
                <p>${task.description}</p>
                <p>Status: <strong>${task.status}</strong></p>
            `;
            taskReview.appendChild(taskCard);
        }
    });
});
