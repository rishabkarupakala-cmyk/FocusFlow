import type { Task } from "../types/task";
import { animateCounter } from "../utils/animateCounter";
export function updateExtraStats(tasks: Task[]): void {

    const productivity =
        document.getElementById("productivity-score");

    const progress =
        document.getElementById("completion-progress");

    const completionText =
        document.getElementById("completion-text");

    const overdue =
        document.getElementById("overdue-count");

    if (
        !productivity ||
        !progress ||
        !completionText ||
        !overdue
    ) {
        return;
    }

    const total = tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    const completionRate =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);

    const today = new Date();

    const overdueTasks =
        tasks.filter(task => {

            return (
                !task.completed &&
                new Date(task.due_date) < today
            );

        }).length;

    animateCounter(
    productivity,
    completionRate,
    "%"
);

animateCounter(
    completionText,
    completionRate,
    "%"
);

animateCounter(
    overdue,
    overdueTasks
);

    (
        progress as HTMLDivElement
    ).style.width =
        `${completionRate}%`;


}