document.getElementById('task-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('task-title').value;
    const desc = document.getElementById('task-desc').value;
    
    const task = {
        title: title,
        description: desc,
        status: 'pending' // Default status
    };

    // Add task to the task list
    addTaskToList(task);
    
    // Clear the form
    document.getElementById('task-form').reset();
});

function addTaskToList(task) {
    const taskList = document.querySelector('.task-list');
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.innerHTML = `
        <h4>${task.title}</h4>
        <p>${task.description}</p>
        <p>Status: ${task.status}</p>
        <button class="approve-button">Approve</button>
        <button class="reject-button">Reject</button>
        <button class="view-details">View Details</button>
    `;
    taskList.appendChild(taskCard);

    // Approve button functionality
    taskCard.querySelector('.approve-button').addEventListener('click', function () {
        task.status = 'approved';
        taskCard.querySelector('p:last-child').innerText = `Status: ${task.status}`;
        updateRewards(task.title);
    });

    // Reject button functionality
    taskCard.querySelector('.reject-button').addEventListener('click', function () {
        taskCard.remove(); // Remove the task card
    });

    // View details button functionality
    taskCard.querySelector('.view-details').addEventListener('click', function () {
        showModal(task);
    });
}

function updateRewards(taskTitle) {
    const rewardList = document.querySelector('.reward-list');
    const rewardCard = document.createElement('div');
    rewardCard.className = 'reward-card';
    rewardCard.innerText = `✅ You completed: ${taskTitle}`;
    rewardList.appendChild(rewardCard);
}

function showModal(task) {
    const modal = document.getElementById('task-modal');
    document.getElementById('modal-description').innerText = task.description;
    modal.style.display = "block";

    // Close modal functionality
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}

// Filter tasks based on status
document.getElementById('task-filter').addEventListener('change', function () {
    const filterValue = this.value;
    const taskCards = document.querySelectorAll('.task-card');

    taskCards.forEach(card => {
        const statusText = card.querySelector('p:last-child').innerText;
        if (filterValue === 'all' || statusText.includes(filterValue)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});
