const scriptURL = "https://script.google.com/macros/s/AKfycbywkcnOU522evB_ExvyXDljHZiSULARONDTOyHNtFTRZPh6xeyRCGfWwynjKwRdjfKdsA/exec"; 

// 1. Pəncərələr arası keçid (Bayaq işləməyən hissə buydu)
function toggleAuth() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const authBox = document.getElementById('auth-box');

    authBox.style.opacity = "0";
    setTimeout(() => {
        if (registerForm.style.display === "none" || registerForm.style.display === "") {
            loginForm.style.display = "none";
            registerForm.style.display = "block";
        } else {
            loginForm.style.display = "block";
            registerForm.style.display = "none";
        }
        authBox.style.opacity = "1";
    }, 300);
}

// 2. Mailə kod göndərmə
function sendCode() {
    const email = document.getElementById('reg-email').value;
    if(!email) return alert("Mail yazın!");

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ "action": "sendCode", "email": email })
    });

    document.getElementById('register-form').style.display = "none";
    document.getElementById('verify-form').style.display = "block";
    alert("Kod göndərildi (Spam-a baxın)");
}

// 3. Qeydiyyatı bitirmə və Bazaya yazma
function finishRegister() {
    const userData = {
        action: "register",
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('reg-email').value,
        address: document.getElementById('address').value,
        mmc: document.getElementById('mmc').value,
        pass: document.getElementById('reg-pass').value
    };

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(userData)
    });

    alert("Məlumatlar log.data-ya göndərildi!");
    setTimeout(() => { window.location.reload(); }, 2000);
}

// 4. Giriş düyməsi üçün (Xəta verməməsi üçün boş saxlayırıq)
function login() {
    alert("Giriş sistemi hələ aktiv deyil.");
}
