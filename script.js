javascript
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Function to update task count
function updateTaskCount() {
  const count = taskList.children.length;
  taskCount.textContent = `${count} Task${count !== 1 ? 's' : ''}`;
}

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement("li");

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;
  taskSpan.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete");
  deleteButton.addEventListener("click", () => {
    taskList.removeChild(li);
    saveTasks();
    updateTaskCount();
  });

  li.appendChild(taskSpan);
  li.appendChild(deleteButton);
  taskList.appendChild(li);

  taskInput.value = "";
  saveTasks();
  updateTaskCount();
}

// Function to save tasks to local storage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => {
    const li = document.createElement("li");
    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;
    if (task.completed) {
      li.classList.add("completed");
    }
    taskSpan.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => {
      taskList.removeChild(li);
      saveTasks();
      updateTaskCount();
    });

    li.appendChild(taskSpan);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
  updateTaskCount();
}

// Event Listeners
addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
