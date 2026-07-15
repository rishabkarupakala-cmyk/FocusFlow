import {
    Chart,
    DoughnutController,
    PieController,
    BarController,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title
} from "chart.js";

import type { Task } from "../types/task";

Chart.register(
    DoughnutController,
    PieController,
    BarController,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title
);

let categoryChart: Chart | null = null;
let statusChart: Chart | null = null;
let priorityChart: Chart | null = null;

export function renderCharts(tasks: Task[]): void {

    categoryChart?.destroy();
    statusChart?.destroy();
    priorityChart?.destroy();

    const categoryCount = {
        Study: 0,
        Project: 0,
        Personal: 0,
        Work: 0
    };

    const priorityCount = {
        High: 0,
        Medium: 0,
        Low: 0
    };

    let completed = 0;
    let pending = 0;

    tasks.forEach(task => {

        console.log(task.category);

        const category =
    task.category.trim();

switch (category.toLowerCase()) {

    case "study":
        categoryCount.Study++;
        break;

    case "project":
        categoryCount.Project++;
        break;

    case "personal":
        categoryCount.Personal++;
        break;

    case "work":
        categoryCount.Work++;
        break;

}

        if (task.priority in priorityCount) {
            priorityCount[
                task.priority as keyof typeof priorityCount
            ]++;
        }

        if (task.completed) {
            completed++;
        } else {
            pending++;
        }

    });

    const categoryCanvas =
        document.getElementById("categoryChart") as HTMLCanvasElement;

    const statusCanvas =
        document.getElementById("statusChart") as HTMLCanvasElement;

    const priorityCanvas =
        document.getElementById("priorityChart") as HTMLCanvasElement;

    categoryChart = new Chart(categoryCanvas, {

        type: "doughnut",

        data: {

            labels: Object.keys(categoryCount),

            datasets: [

                {

                    data: Object.values(categoryCount),

                    backgroundColor: [
                        "#3B82F6",
                        "#8B5CF6",
                        "#10B981",
                        "#F59E0B"
                    ],

                    borderColor: "#ffffff",

                    borderWidth: 3,

                    hoverOffset: 20

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            animation: {

                duration: 1400,

                easing: "easeOutBounce"

            },

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

    statusChart = new Chart(statusCanvas, {

        type: "pie",

        data: {

            labels: [

                "Completed",

                "Pending"

            ],

            datasets: [

                {

                    data: [

                        completed,

                        pending

                    ],

                    backgroundColor: [

                        "#22C55E",

                        "#EF4444"

                    ],

                    borderColor: "#ffffff",

                    borderWidth: 3,

                    hoverOffset: 20

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            animation: {

                duration: 1400,

                easing: "easeOutBounce"

            },

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

    priorityChart = new Chart(priorityCanvas, {

        type: "bar",

        data: {

            labels: Object.keys(priorityCount),

            datasets: [

                {

                    label: "Tasks",

                    data: Object.values(priorityCount),

                    backgroundColor: [

                        "#EF4444",

                        "#F59E0B",

                        "#22C55E"

                    ],

                    borderRadius: 12,

                    borderSkipped: false

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            animation: {

                duration: 1500,

                easing: "easeOutQuart"

            },

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        precision: 0

                    }

                }

            }

        }

    });

}