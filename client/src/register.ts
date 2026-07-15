import { register } from "./api/authApi";

const form = document.getElementById("register-form");

if (form instanceof HTMLFormElement) {

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const confirmPassword =
            document.getElementById("confirm-password");

        if (
            !(name instanceof HTMLInputElement) ||
            !(email instanceof HTMLInputElement) ||
            !(password instanceof HTMLInputElement) ||
            !(confirmPassword instanceof HTMLInputElement)
        ) {
            return;
        }

        if (password.value !== confirmPassword.value) {

            alert("Passwords do not match!");

            return;

        }

        try {

            await register(

                name.value,

                email.value,

                password.value

            );

            alert("🎉 Account created successfully!");

            window.location.href = "/login.html";

        } catch (error: any) {

            alert(error.message);

        }

    });

}

