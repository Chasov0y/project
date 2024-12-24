document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".content-section");
    const menuItems = document.querySelectorAll(".menu-item");
    const authForm = document.getElementById("auth-form");
    const authOverlay = document.getElementById("auth-overlay");
    const userInfo = document.getElementById("user-info");
    const userLogin = document.getElementById("user-login");
    const logoutBtn = document.getElementById("logout-btn");
    const profileLogoutBtn = document.getElementById("profile-logout-btn");

    // Функция валидации логина
    const validateUsername = (username) => {
        const regex = /^[А-Яа-я0-9]{4,10}$/;
        return regex.test(username);
    };

    // Функция валидации даты
    const validateDate = (date) => {
        const minDate = new Date("1950-01-01");
        const today = new Date();
        const inputDate = new Date(date);
        return inputDate >= minDate && inputDate <= today;
    };

    // Обновленный процесс авторизации
    authForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = authForm.username.value.trim();
        const birthdate = authForm.birthdate.value;
        const gender = authForm.gender.value;

        let valid = true;

        // Проверка логина
        if (!validateUsername(username)) {
            document.getElementById("username-error").textContent =
                "Логин должен содержать от 4 до 10 символов и состоять из русских букв или цифр.";
            valid = false;
        } else {
            document.getElementById("username-error").textContent = "";
        }

        // Проверка даты рождения
        if (!validateDate(birthdate)) {
            document.getElementById("birthdate-error").textContent =
                "Дата рождения должна быть между 1950 и сегодняшним днем.";
            valid = false;
        } else {
            document.getElementById("birthdate-error").textContent = "";
        }

        // Проверка выбора пола
        if (!gender) {
            document.getElementById("gender-error").textContent = "Выберите пол.";
            valid = false;
        } else {
            document.getElementById("gender-error").textContent = "";
        }

        // Если все поля валидны
        if (valid) {
            userLogin.textContent = username;
            authOverlay.style.display = "none";
            authForm.reset(); // Очистить форму после успешной авторизации
        }
    });

    // Логика переключения разделов
    menuItems.forEach((item) => {
        item.addEventListener("click", () => {
            const targetSection = item.dataset.section;
            sections.forEach((section) => {
                section.classList.toggle("active", section.id === targetSection);
            });
            menuItems.forEach((menuItem) =>
                menuItem.classList.toggle("active", menuItem === item)
            );
        });
    });

    const clearErrors = () => {
        document.getElementById("username-error").textContent = "";
        document.getElementById("birthdate-error").textContent = "";
        document.getElementById("gender-error").textContent = "";
    };

    // Логика выхода
    const logout = () => {
        authOverlay.style.display = "flex";
        userLogin.textContent = "";
    };

    logoutBtn.addEventListener("click", logout);
    profileLogoutBtn.addEventListener("click", logout);
});
document.addEventListener("DOMContentLoaded", () => {
    const authForm = document.getElementById("auth-form");
    const authOverlay = document.getElementById("auth-overlay");
    const userLogin = document.getElementById("user-login");
    const errorPopup = document.getElementById("error-popup");
    const errorMessage = document.getElementById("error-message");
    const closeErrorBtn = document.getElementById("close-error-btn");

    // Функция валидации логина
    const validateUsername = (username) => /^[А-Яа-я0-9]{4,10}$/.test(username);

    // Функция показа ошибки
    const showError = (message) => {
        errorMessage.textContent = message;
        errorPopup.classList.remove("hidden");
    };

    // Закрытие окна ошибки
    closeErrorBtn.addEventListener("click", () => {
        errorPopup.classList.add("hidden");
    });

    // Авторизация
    authForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = authForm.username.value.trim();
        const birthdate = authForm.birthdate.value;
        const gender = authForm.gender.value;

        if (!validateUsername(username)) {
            showError("Логин должен содержать от 4 до 10 символов, включая русские буквы и цифры.");
            return;
        }

        if (!gender) {
            showError("Пожалуйста, выберите ваш пол.");
            return;
        }

        userLogin.textContent = username;
        authOverlay.style.display = "none";
        authForm.reset();
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");

    // Функция применения темы
    const applyTheme = (isDark) => {
        if (isDark) {
            document.body.classList.add("dark-theme");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-theme");
            localStorage.setItem("theme", "light");
        }
    };

    // Проверка сохранённой темы
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        themeToggle.checked = true;
        applyTheme(true);
    }

    // Слушатель переключения темы
    themeToggle.addEventListener("change", () => {
        applyTheme(themeToggle.checked);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const images = [
        'img/image1.webp',
        'img/image2.webp',
        'img/image3.jpg',
        'img/image4.jpg',
        'img/image5.jpg'
    ];
    let currentSlide = 0;
    const sliderImage = document.getElementById("slider-image");
    const sliderInfo = document.getElementById("slider-info");

    const updateSlider = () => {
        sliderImage.style.transform = 'scale(1.1)'; // Увеличиваем изображение перед сменой
        setTimeout(() => {
            sliderImage.src = images[currentSlide];
            sliderImage.style.transform = 'scale(1)'; // Возвращаем размер изображения
            sliderInfo.textContent = `${currentSlide + 1} слайд из ${images.length}`;
        }, 300); // Задержка для анимации увеличения изображения
    };

    document.getElementById("prev-btn").addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + images.length) % images.length;
        updateSlider();
    });

    document.getElementById("next-btn").addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % images.length;
        updateSlider();
    });

    updateSlider(); // Инициализация с первого слайда
});

document.addEventListener("DOMContentLoaded", () => {
    const glossaryList = document.getElementById("glossary-list");
    const termDescription = document.getElementById("term-description");
    const searchInput = document.getElementById("search");
    const glossaryItems = Array.from(glossaryList.getElementsByTagName("li"));

    // Функция для отображения описания термина
    glossaryList.addEventListener("click", (e) => {
        if (e.target && e.target.nodeName === "LI") {
            const description = e.target.getAttribute("data-description");
            termDescription.textContent = description;
        }
    });

    // Функция для поиска по словарю
    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();

        glossaryItems.forEach(item => {
            const termText = item.textContent.toLowerCase();
            // Если термин содержит поисковую строку, показываем его, иначе скрываем
            if (termText.includes(searchTerm)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const authForm = document.getElementById("auth-form");
    const authOverlay = document.getElementById("auth-overlay");
    const userLogin = document.getElementById("user-login");
    const logoutBtn = document.getElementById("logout-btn");
    const profileLogoutBtn = document.getElementById("profile-logout-btn");
    const profileSection = document.getElementById("profile");

    // Авторизация
    authForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // После успешной авторизации показываем личный кабинет
        userLogin.textContent = authForm.username.value;
        authOverlay.style.display = "none"; // Скрыть форму авторизации
        profileSection.style.display = "block"; // Показываем личный кабинет
    });

    // Логика выхода
    const logout = () => {
        authOverlay.style.display = "flex"; // Показываем форму авторизации
        userLogin.textContent = "";
        profileSection.style.display = "none"; // Скрываем личный кабинет
    };

    logoutBtn.addEventListener("click", logout);
    profileLogoutBtn.addEventListener("click", logout);
});
const clearErrors = () => {
        document.getElementById("username-error").textContent = "";
        document.getElementById("birthdate-error").textContent = "";
        document.getElementById("gender-error").textContent = "";
    };