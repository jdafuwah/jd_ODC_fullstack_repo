// 1. Select the necessary elements from the HTML
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');

// 2. Add the main event listener to the "Add" button
addButton.addEventListener('click', addTask);

// Also allow adding task on 'Enter' key press
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// --- Function to ADD a New Task ---
function addTask() {
    const taskText = taskInput.value.trim();

    // Prevent adding empty tasks
    if (taskText === "") {
        alert("Please enter a task before adding.");
        return;
    }

    // 1. Create the new list item structure (li, checkbox, span, buttons)
    const li = document.createElement('li');
    li.className = 'task-item';
    
    // Set the inner HTML of the list item (this is often the easiest way for complex elements)
    li.innerHTML = `
        <input type="checkbox" class="task-item__checkbox" onclick="toggleComplete(this)">
        <span class="task-item__text">${taskText}</span>
        <div class="task-item__buttons">
            <button class="task-item__button task-item__complete" onclick="toggleComplete(this.closest('.task-item').querySelector('.task-item__checkbox'))">Complete</button>
            <button class="task-item__button task-item__edit" onclick="editTask(this)">Edit</button>
            <button class="task-item__button task-item__delete" onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    // 2. Add the new list item to the main list
    taskList.appendChild(li);

    // 3. Clear the input field for the next task
    taskInput.value = '';
}

// --- Function to COMPLETE/TOGGLE a Task ---
function toggleComplete(checkbox) {
    // 1. Find the parent <li> element of the checkbox
    const taskItem = checkbox.closest('.task-item');

    // 2. Toggle the 'completed' class on the <li>
    // The CSS uses this class to apply the strike-through and grey color
    taskItem.classList.toggle('completed');

    // 3. Ensure the checkbox state matches (in case it was clicked via the 'Complete' button)
    checkbox.checked = taskItem.classList.contains('completed');
}

// --- Function to DELETE a Task ---
function deleteTask(button) {
    // 1. Find the parent <li> element of the Delete button
    const taskItem = button.closest('.task-item');

    // 2. Remove the entire list item from the list
    taskItem.remove();
}

// --- Function to EDIT a Task ---
function editTask(button) {
    // 1. Find the parent <li> and the task text span
    const taskItem = button.closest('.task-item');
    const taskTextSpan = taskItem.querySelector('.task-item__text');
    
    // Prompt the user for a new value. The old value is used as the default.
    const newText = prompt("Edit your task:", taskTextSpan.textContent);

    // Check if the user entered something and didn't just hit 'Cancel' or leave it empty
    if (newText !== null && newText.trim() !== "") {
        // Update the text content of the span element
        taskTextSpan.textContent = newText.trim();
    }
}

// OPTIONAL: Remove the placeholder item on load for a clean list
document.addEventListener('DOMContentLoaded', () => {
    const placeholder = taskList.querySelector('.task-item');
    if (placeholder) {
        placeholder.remove();
    }
});