export interface Task {
    id: number;
    title: string;
    description: string;
    category: string;
    priority: "Low" | "Medium" | "High";
    due_date: string;
    completed: number;
    create_at: string;
}