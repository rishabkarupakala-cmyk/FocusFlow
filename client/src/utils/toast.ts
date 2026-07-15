export function showToast(message: string): void {

const toast = document.createElement("div");

toast.className = "toast";
toast.textContent = message;
document.body.appendChild(toast);
setTimeout(() => {toast.classList.add("show");}, 50);
setTimeout(() => {toast.classList.remove("show");
setTimeout(() => {toast.remove();}, 300);}, 2500);
}