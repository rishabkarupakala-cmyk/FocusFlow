import {
    getTasks,
    createTask,
    updateTask
} from "../api/taskApi";

import { createTaskCard } from "../components/TaskCard";

import { renderCharts } from "../components/Charts";

import { updateExtraStats } from "../components/Stats";

import { renderUpcoming } from "../components/Upcoming";

import { animateCounter } from "../utils/animateCounter";

import { getCurrentTaskId } from "../utils/editTask";

import type { Task } from "../types/task";

let allTasks: Task[] = [];

export async function loadTasks(): Promise<void> {

    try {

        allTasks = await getTasks();

        updateDashboard(allTasks);

        updateExtraStats(allTasks);

        renderCharts(allTasks);

        renderUpcoming(allTasks);

        renderTasks(allTasks);

    } catch (error) {

        console.error("Failed to load tasks:", error);

    }

}

function renderTasks(tasks: Task[]): void {

    const container =
        document.getElementById("task-container");

    if (!container) return;

    container.innerHTML = "";

    tasks.forEach(task => {

        container.appendChild(

            createTaskCard(task)

        );

    });

}

function updateDashboard(tasks: Task[]): void {

    const total =
        document.getElementById("total-count");

    const completed =
        document.getElementById("completed-count");

    const pending =
        document.getElementById("pending-count");

    const high =
        document.getElementById("high-count");

    if (total)

        animateCounter(

            total,

            tasks.length

        );

    if (completed)

        animateCounter(

            completed,

            tasks.filter(

                t => t.completed

            ).length

        );

    if (pending)

        animateCounter(

            pending,

            tasks.filter(

                t => !t.completed

            ).length

        );

    if (high)

        animateCounter(

            high,

            tasks.filter(

                t => t.priority === "High"

            ).length

        );

}
export function setupTaskForm(): void {

    const form =
        document.getElementById("task-form");

    if (!(form instanceof HTMLFormElement))
        return;

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const title =
            document.getElementById("title");

        const description =
            document.getElementById("description");

        const category =
            document.getElementById("category");

        const priority =
            document.getElementById("priority");

        const dueDate =
            document.getElementById("due_date");

        if (
            !(title instanceof HTMLInputElement) ||
            !(description instanceof HTMLInputElement) ||
            !(category instanceof HTMLSelectElement) ||
            !(priority instanceof HTMLSelectElement) ||
            !(dueDate instanceof HTMLInputElement)
        ) {
            return;
        }

        const task = {

            title: title.value,

            description: description.value,

            category: category.value,

            priority: priority.value,

            due_date: dueDate.value

        };

        try {

            await createTask(task);

            form.reset();

            await loadTasks();

        } catch (error) {

            console.error("Failed to create task:", error);

        }

    });

}

export function setupSearch(): void {

    const search =
        document.getElementById("search");

    if (!(search instanceof HTMLInputElement))
        return;

    search.addEventListener("input", applyFilters);

}

export function setupCategoryFilter(): void {

    const filter =
        document.getElementById("category-filter");

    if (!(filter instanceof HTMLSelectElement))
        return;

    filter.addEventListener("change", applyFilters);

}

export function setupPriorityFilter(): void {

    const filter =
        document.getElementById("priority-filter");

    if (!(filter instanceof HTMLSelectElement))
        return;

    filter.addEventListener("change", applyFilters);

}

function applyFilters(): void {

    const search =
        document.getElementById("search");

    const category =
        document.getElementById("category-filter");

    const priority =
        document.getElementById("priority-filter");

    if (
        !(search instanceof HTMLInputElement) ||
        !(category instanceof HTMLSelectElement) ||
        !(priority instanceof HTMLSelectElement)
    ) {
        return;
    }

    const keyword =
        search.value.toLowerCase();

    const filtered = allTasks.filter(task => {

        const matchesSearch =

            task.title.toLowerCase().includes(keyword) ||

            task.description.toLowerCase().includes(keyword) ||

            task.category.toLowerCase().includes(keyword);

        const matchesCategory =

            category.value === "" ||

            task.category === category.value;

        const matchesPriority =

            priority.value === "" ||

            task.priority === priority.value;

        return (

            matchesSearch &&

            matchesCategory &&

            matchesPriority

        );

    });

    renderTasks(filtered);

}

export function setupEditForm(): void {
console.log("setupEditForm running");
    const form = document.getElementById("edit-form");
    const cancel = document.getElementById("cancel-edit");
    const modal = document.getElementById("edit-modal");

    console.log(form);
console.log(cancel);
console.log(modal);

    if (
        !(form instanceof HTMLFormElement) ||
        !(cancel instanceof HTMLButtonElement) ||
        !(modal instanceof HTMLDivElement)
    ) {
        console.log("One of the elements is null");
        return;
    }

    cancel.addEventListener("click", () => {

        modal.classList.add("hidden");

    });

    form.addEventListener("submit", async (event) => {
        console.log("Edit form submitted");
        event.preventDefault();

        const id = getCurrentTaskId();

        if (id === null) return;

        const title = document.getElementById("edit-title");
        const description = document.getElementById("edit-description");
        const category = document.getElementById("edit-category");
        const priority = document.getElementById("edit-priority");
        const dueDate = document.getElementById("edit-due-date");

        if (
            !(title instanceof HTMLInputElement) ||
            !(description instanceof HTMLInputElement) ||
            !(category instanceof HTMLSelectElement) ||
            !(priority instanceof HTMLSelectElement) ||
            !(dueDate instanceof HTMLInputElement)
        ) {
            return;
        }

        const updatedTask = {

            title: title.value,

            description: description.value,

            category: category.value,

            priority: priority.value,

            due_date: dueDate.value

        };

        try {

    console.log("Task ID:", id);

    console.log("Updated Task:", updatedTask);

    modal.classList.add("hidden");
    await updateTask(id, updatedTask);

// Force hide modal
modal.classList.add("hidden");

// Reset form
form.reset();

// Clear current task
document.body.click();

await loadTasks();



    

} catch (error) {

    console.error("Failed to update task:", error);

}
    });

}