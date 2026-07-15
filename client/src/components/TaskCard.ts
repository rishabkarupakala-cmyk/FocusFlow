import type { Task } from "../types/task";
import { deleteTask, completeTask } from "../api/taskApi";
import { showToast } from "../utils/toast";
import { loadTasks } from "../pages/Home";
import { setCurrentTaskId } from "../utils/editTask";

export function createTaskCard(task: Task): HTMLElement {

    const card = document.createElement("div");

    card.className = "task-card";

    card.innerHTML = `
        <h2>${task.title}</h2>

        <p>${task.description}</p>

        <p><strong>Category:</strong> ${task.category}</p>

        <p><strong>Priority:</strong> ${task.priority}</p>

        <p><strong>Due:</strong> ${task.due_date}</p>

        <p>${task.completed ? "✅ Completed" : "⌛ Pending"}</p>

        <div class="card-buttons">

            <button class="edit-btn">
                ✏ Edit
            </button>

            <button class="complete-btn">
                ${task.completed ? "↩ Undo" : "✅ Complete"}
            </button>

            <button class="delete-btn">
                🗑 Delete
            </button>

        </div>
    `;

    const deleteBtn =
        card.querySelector(".delete-btn") as HTMLButtonElement;

    deleteBtn.addEventListener("click", async () => {

        const confirmDelete =
            confirm("Delete this task?");

        if (!confirmDelete) return;

        await deleteTask(task.id);
        showToast("🗑 Task deleted!");
        await loadTasks();

    });

    const completeBtn =
        card.querySelector(".complete-btn") as HTMLButtonElement;
setCurrentTaskId(task.id);
    completeBtn.addEventListener("click", async () => {

        await completeTask(task.id);
        showToast("✅ Task updated!");
        await loadTasks();

    });

    const editBtn =
        card.querySelector(".edit-btn") as HTMLButtonElement;

    editBtn.addEventListener("click", () => {

        const editTitle = document.getElementById("edit-title");

if (editTitle instanceof HTMLInputElement) {
    editTitle.value = task.title;
}
console.log(editTitle);
        const editDescription = document.getElementById("edit-description");

if (editDescription instanceof HTMLInputElement) {
    editDescription.value = task.description;
}

const editCategory = document.getElementById("edit-category");

if (editCategory instanceof HTMLSelectElement) {
    editCategory.value = task.category;
}

const editPriority = document.getElementById("edit-priority");

if (editPriority instanceof HTMLSelectElement) {
    editPriority.value = task.priority;
}

const editDueDate = document.getElementById("edit-due-date");

if (editDueDate instanceof HTMLInputElement) {
    editDueDate.value = task.due_date;
}
        document
            .getElementById("edit-modal")
            ?.classList.remove("hidden");

    });

    return card;

}