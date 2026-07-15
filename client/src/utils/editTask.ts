let currentTaskId: number | null = null;

export function setCurrentTaskId(id: number) {
currentTaskId = id;
}

export function getCurrentTaskId() {
return currentTaskId;
}