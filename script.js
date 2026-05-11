function toggleAuth() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const authBox = document.getElementById('auth-box');

    // Keçid animasiyasını yeniləyirik
    authBox.style.opacity = "0";
    
    setTimeout(() => {
        if (loginForm.style.display === "none") {
            loginForm.style.display = "block";
            registerForm.style.display = "none";
        } else {
            loginForm.style.display = "none";
            registerForm.style.display = "block";
        }
        authBox.style.opacity = "1";
    }, 300);
}

function sendCode() {
    // Struktur 1.3.8-ə keçid
    document.getElementById('register-form').style.display = "none";
    document.getElementById('verify-form').style.display = "block";
}

function login() {
    alert("Tezliklə: Google Sheets bağlantısı qurulacaq!");
}
