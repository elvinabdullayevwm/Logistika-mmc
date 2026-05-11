const scriptURL = "https://script.google.com/macros/s/AKfycby_zeZwqNpaYsDc4GqiUFXZE5YSnJFp3DZHhnnlDpGgVvo53YnvzQkC8CWNMsDRrGoIMw/exec"; 

// Qeydiyyat və Giriş pəncərələri arası keçid (Dizayn 1)
function toggleAuth() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const authBox = document.getElementById('auth-box');

    // Yumşaq keçid effekti
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

// Mailə kod göndərmə (Struktur 1.3.8)
function sendCode() {
    const email = document.getElementById('reg-email').value;
    if(!email) return alert("Zəhmət olmasa mail yazın!");

    const btn = document.querySelector("#register-form .btn-primary");
    btn.innerText = "Göndərilir...";
    btn.disabled = true;

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ "action": "sendCode", "email": email })
    }).then(() => {
        // Formu dəyişirik
        document.getElementById('register-form').style.display = "none";
        document.getElementById('verify-form').style.display = "block";
        alert("Kod göndərildi! Mailinizi yoxlayın.");
    }).catch(() => {
        alert("Bağlantı xətası!");
        btn.innerText = "Qeydiyyatdan keç";
        btn.disabled = false;
    });
}

function finishRegister() {
    alert("Təsdiqləndi! Xoş gəldiniz.");
}

function login() {
    alert("Giriş funksiyası tezliklə aktiv olacaq.");
}
