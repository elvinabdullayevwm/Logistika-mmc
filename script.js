const scriptURL = "https://script.google.com/macros/s/AKfycbwgktPQUEy934AfP7Vc3mbi7HiNvxRpD1srfHxoTB_IdQyH6ZB-YAgbV0wVxJXNCgQ2Qw/exec"; 
let systemGeneratedCode = ""; // Hər dəfə sıfırlanacaq

function sendCode() {
    const email = document.getElementById('reg-email').value;
    if(!email) return alert("Mail yazın!");

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
            systemGeneratedCode = response.code; // Google-dan gələn YENİ kod
            document.getElementById('register-form').style.display = "none";
            document.getElementById('verify-form').style.display = "block";
            alert("Yeni kod mailinizə göndərildi!");
        }
    })
    .catch(err => {
        alert("Bağlantı xətası! İnterneti və ya Linki yoxlayın.");
        btn.innerText = "Qeydiyyatdan keç";
        btn.disabled = false;
    });
}

function finishRegister() {
    const userCode = document.getElementById('code').value;
    if (userCode == systemGeneratedCode) { // Yalnız yeni gələn kodu yoxlayırıq
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

        fetch(scriptURL, { method: 'POST', body: JSON.stringify(userData) })
        .then(() => {
            alert("Təbrik edirik! Məlumatlar log.data-ya yazıldı.");
            window.location.reload();
        });
    } else {
        alert("Kod səhvdir! Mailinizə gələn sonuncu kodu yazın.");
    }
}
