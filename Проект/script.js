document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".content-section");
    const menuItems = document.querySelectorAll(".menu-item");
    const authForm = document.getElementById("auth-form");
    const authOverlay = document.getElementById("auth-overlay");
    const userInfo = document.getElementById("user-info");
    const userLogin = document.getElementById("user-login");
    const logoutBtn = document.getElementById("logout-btn");
    const profileLogoutBtn = document.getElementById("profile-logout-btn");

    const validateDate = (date) => {
        const minDate = new Date("1950-01-01");
        const today = new Date();
        const inputDate = new Date(date);
        return inputDate >= minDate && inputDate <= today;
    };

    // Авторизация
    authForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = authForm.username.value.trim();
        const birthdate = authForm.birthdate.value;
        const gender = authForm.gender.value;

        let valid = true;

        if (!authForm.username.checkValidity()) {
            document.getElementById("username-error").textContent = "Логин должен быть от 4 до 10 символов русских букв и цифр.";
            valid = false;
        } else {
            document.getElementById("username-error").textContent = "";
        }

        if (!validateDate(birthdate)) {
            document.getElementById("birthdate-error").textContent = "Дата рождения должна быть между 1950 и сегодняшним днем.";
            valid = false;
        } else {
            document.getElementById("birthdate-error").textContent = "";
        }

        if (!gender) {
            document.getElementById("gender-error").textContent = "Выберите пол.";
            valid = false;
        } else {
            document.getElementById("gender-error").textContent = "";
        }

        if (valid) {
            userLogin.textContent = username;
            authOverlay.style.display = "none";
        }
    });

    // Логика меню
    menuItems.forEach((item) => {
        item.addEventListener("click", () => {
            const targetSection = item.dataset.section;
            sections.forEach((section) => {
                section.classList.toggle("active", section.id === targetSection);
            });
            menuItems.forEach((menuItem) => menuItem.classList.toggle("active", menuItem === item));
        });
    });

    // Выход
    const logout = () => {
        authOverlay.style.display = "flex";
        userLogin.textContent = "";
    };

    logoutBtn.addEventListener("click", logout);
    profileLogoutBtn.addEventListener("click", logout);
});
