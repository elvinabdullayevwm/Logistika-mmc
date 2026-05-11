const scriptURL = "BURA_YENI_ALDIĞIN_LINKI_YAPISDIR"; 
let generatedCode = ""; 

function sendCode() {
    const email = document.getElementById('reg-email').value;
    if(!email) return alert("Zəhmət olmasa mailinizi yazın!");

    const btn = document.querySelector("#register-form .btn-primary");
    btn.innerText = "Kod Göndərilir...";
    btn.disabled = true;

    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify({ "action": "sendCode", "email": email })
    })
    .then(res => res.json())
    .then(response => {
        if(response.result === "success") {
            generatedCode = response.code; 
            document.getElementById('register-form').style.display = "none";
            document.getElementById('verify-form').style.display = "block";
            alert("Kod mailinizə göndərildi!");
        } else {
            alert("Xəta: " + response.error);
        }
    })
    .catch(error => {
        console.log(error);
        // Əgər brauzer bloklasa belə qeydiyyat pəncərəsinə keçək (test üçün)
        document.getElementById('register-form').style.display = "none";
        document.getElementById('verify-form').style.display = "block";
    });
}

function finishRegister() {
    const userCode = document.getElementById('code').value;
    if (userCode == generatedCode || userCode == "7777") { // 7777 test üçün "master kod" olsun
        alert("Təsdiqləndi! Logistika 1-ə xoş gəldiniz.");
    } else {
        alert("Kod səhvdir!");
    }
}
