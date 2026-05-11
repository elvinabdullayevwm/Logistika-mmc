const scriptURL = "https://script.google.com/macros/s/AKfycbywkcnOU522evB_ExvyXDljHZiSULARONDTOyHNtFTRZPh6xeyRCGfWwynjKwRdjfKdsA/exec";

function sendCode() {
    const email = document.getElementById('reg-email').value;
    if(!email) return alert("Mail yazın!");

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', // Brauzer maneəsini keçmək üçün
        body: JSON.stringify({ "action": "sendCode", "email": email })
    });

    // Sorğu gedən kimi pəncərəni dəyişirik (cavabı gözləmədən)
    document.getElementById('register-form').style.display = "none";
    document.getElementById('verify-form').style.display = "block";
    alert("Kod göndərildi (Spam qovluğuna baxın)");
}

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

    alert("Məlumatlar göndərildi! log.data cədvəlini yoxlayın.");
    setTimeout(() => { window.location.reload(); }, 2000);
}
