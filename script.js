const scriptURL = "https://script.google.com/macros/s/AKfycbyl9-FroOsQXzGGPYDU5yMEXAc7fdmCHYA27Pbp0943neZjsDzdElF4ZqLJpKU9u1HsKA/exec"; 
let systemGeneratedCode = ""; 

function toggleAuth() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const authBox = document.getElementById('auth-box');
    authBox.style.opacity = "0";
    setTimeout(() => {
        if (registerForm.style.display === "none") {
            loginForm.style.display = "none";
            registerForm.style.display = "block";
        } else {
            loginForm.style.display = "block";
            registerForm.style.display = "none";
        }
        authBox.style.opacity = "1";
    }, 300);
}

function sendCode() {
    const email = document.getElementById('reg-email').value;
    if(!email) return alert("Mail yazın!");

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ "action": "sendCode", "email": email })
    }).then(() => {
        document.getElementById('register-form').style.display = "none";
        document.getElementById('verify-form').style.display = "block";
        alert("Kod göndərildi!");
    });
}

function finishRegister() {
    const userCode = document.getElementById('code').value;
    
    // Test üçün 4 rəqəmli hər hansı kod yazıldıqda qəbul etsin (Məlumatları bazaya yazmaq üçün)
    if (userCode.length === 4) {
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
        }).then(() => {
            alert("Qeydiyyat tamamlandı! Məlumatlar log.data-ya yazıldı.");
            window.location.reload(); // Saytı yeniləyirik
        });
    } else {
        alert("4 rəqəmli kodu daxil edin!");
    }
}
