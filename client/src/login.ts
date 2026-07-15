import { login } from "./api/authApi";

const form = document.getElementById("login-form");

if (form instanceof HTMLFormElement) {

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email = document.getElementById("email");
        const password = document.getElementById("password");

        if (
            !(email instanceof HTMLInputElement) ||
            !(password instanceof HTMLInputElement)
        ) {
            return;
        }

        try {

            const result = await login(
                email.value,
                password.value
            );

            sessionStorage.setItem(
                "token",
                result.token
            );

            sessionStorage.setItem(
                "user",
                JSON.stringify(result.user)
            );

            alert("Login Successful!");

            window.location.href = "/";

        } catch (error: any) {

            alert(error.message);

        }

    });

}