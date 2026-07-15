export function setupTheme() {

const button =document.getElementById("theme-btn") as HTMLButtonElement;
if (!button) return;

const saved =localStorage.getItem("theme");

if(saved==="dark"){document.body.classList.add("dark");button.textContent="☀️";}
button.addEventListener("click",()=>{
document.body.classList.toggle("dark");

const dark =document.body.classList.contains("dark");
localStorage.setItem("theme",dark ? "dark" : "light");

button.textContent =dark ? "☀️" : "🌙";
});
}