// Google Apps Script-dən kopyaladığın URL-i aşağıdakı dırnaqların arasına yapışdır:
const scriptURL = "https://script.google.com/macros/s/AKfycbyTzw5z_W_JU4UvOx7NY-QtE7qH6_smOUP7gqanQz0u2ugytN1IgLJTO_Sm7MXPvNeSww/exec"; 

let generatedCode = ""; 

function toggleAuth() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const authBox = document.getElementById('auth-box');

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
    const email = document.getElementById('reg-email').value;
    if(!email) return alert("Zəhmət olmasa mailinizi yazın!");

    // Düyməni müvəqqəti söndürək ki, çox basılmasın
    const btn = document.querySelector("#register-form .btn-primary");
    btn.innerText = "Göndərilir...";
    btn.disabled = true;

    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify({ "action": "sendCode", "email": email })
    })
    .then(res => res.json())
    .then(response => {
        if(response.result === "success") {
            generatedCode = response.code; // Google-dan gələn kodu yadda saxla
            document.getElementById('register-form').style.display = "none";
            document.getElementById('verify-form').style.display = "block";
            alert("Təsdiq kodu mailinizə göndərildi!");
        } else {
            alert("Xəta baş verdi, yenidən yoxlayın.");
        }
    })
    .catch(error => {
        console.error('Error!', error.message);
        btn.innerText = "Qeydiyyatdan keç";
        btn.disabled = false;
    });
}

function finishRegister() {
    const userCode = document.getElementById('code').value;
    if (userCode == generatedCode) {
        alert("Təsdiqləndi! Xoş gəldiniz.");
        // Bura qeydiyyatdan sonra hara gedəcəyini yazacağıq
    } else {
        alert("Daxil etdiyiniz kod səhvdir.");
    }
}
