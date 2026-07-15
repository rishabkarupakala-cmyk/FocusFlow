
import "./style.css";
import { isLoggedIn } from "./utils/auth";
import { logout } from "./utils/auth";
// Protect dashboard
const token = sessionStorage.getItem("token");

if (!token) {
    window.location.href = "/login.html";
}

if (!isLoggedIn()) {

    window.location.href = "/login.html";

}

const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn instanceof HTMLButtonElement) {

    logoutBtn.addEventListener("click", logout);

}
import {
    loadTasks,
    setupTaskForm,
    setupSearch,
    setupCategoryFilter,
    setupPriorityFilter,
    setupEditForm
} from "./pages/Home";

import { setupTheme } from "./theme";


import { renderQuote } from "./components/Quote";

setupTheme();

setupTaskForm();

setupEditForm();

loadTasks();


renderQuote();

setupSearch();

setupCategoryFilter();

setupPriorityFilter();