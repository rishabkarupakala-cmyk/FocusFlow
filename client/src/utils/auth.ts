export function isLoggedIn(): boolean {

    return sessionStorage.getItem("token") !== null;

}

export function logout(): void {

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    window.location.href = "/login.html";

}