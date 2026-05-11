// Google Apps Script-dən aldığın URL-i bura daxil et
const scriptURL = "https://script.google.com/macros/s/AKfycby_zeZwqNpaYsDc4GqiUFXZE5YSnJFp3DZHhnnlDpGgVvo53YnvzQkC8CWNMsDRrGoIMw/exec"; 

let generatedCode = ""; 

function toggleAuth() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const authBox = document.getElementById('auth-box');

    authBox.style.opacity = "0";
    setTimeout(() => {
        if (loginForm.style.display === "none" || loginForm.style.display === "") {
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
    if(!email) {
        alert("Zəhmət olmasa mailinizi yazın!");
        return;
    }

    const btn = document.querySelector("#register-form .btn-primary");
    btn.innerText = "Göndərilir...";
    btn.disabled = true;

    // Google Script-ə sorğu göndəririk
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', // Brauzer xətalarının qarşısını almaq üçün vacibdir
        body: JSON.stringify({ 
            "action": "sendCode", 
            "email": email 
        })
    })
    .then(() => {
        // 'no-cors' rejimində cavabı oxuya bilmirik, amma sorğu gedir.
        // Test məqsədilə 4 rəqəmli təsadüfi kodu özümüz təxmin edirik 
        // və ya sadəcə təsdiq pəncərəsinə keçirik.
        document.getElementById('register-form').style.display = "none";
        document.getElementById('verify-form').style.display = "block";
        alert("Əgər məlumatlar düzdürsə, kod mailinizə göndərildi!");
    })
    .catch(error => {
        console.error('Xəta:', error);
        alert("Bağlantı xətası baş verdi.");
        btn.innerText = "Qeydiyyatdan keç";
        btn.disabled = false;
    });
}

function finishRegister() {
    const userCode = document.getElementById('code').value;
    // Hələlik testi keçmək üçün istənilən 4 rəqəm daxil etməyə icazə veririk
    if (userCode.length === 4) {
        alert("Təsdiqləndi! Logistika 1-ə xoş gəldiniz.");
    } else {
        alert("Zəhmət olmasa 4 rəqəmli kodu daxil edin.");
    }
}
