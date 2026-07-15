export function isLoggedIn(): boolean {

    return localStorage.getItem("token") !== null;

}

export function logout(): void {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login.html";

}