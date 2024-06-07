// main.js
function showForm(formId) {
    const forms = document.getElementsByClassName('form-container');
    for (let form of forms) {
        form.style.display = 'none';
    }
    document.getElementById(formId).style.display = 'block';
}

document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('forgot-email').value;
    fetch('/backend/routes/auth.php?action=reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('success-message').style.display = 'block';
        } else {
            alert('Erro ao enviar e-mail de recuperação. Por favor, tente novamente mais tarde.');
        }
    })
    .catch(error => {
        console.error('Erro ao enviar solicitação:', error);
        alert('Erro ao enviar e-mail de recuperação. Por favor, tente novamente mais tarde.');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                window.location.href = '.html';
            })
            .catch((error) => {
                alert('Erro ao fazer login: ' + error.message);
            });
    });

    document.getElementById('registerForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                alert('Usuário registrado com sucesso');
                window.location.href = 'index.html';
            })
            .catch((error) => {
                alert('Erro ao registrar: ' + error.message);
            });
    });

    document.getElementById('forgotPasswordForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('forgotEmail').value;
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                alert('Email de recuperação enviado');
            })
            .catch((error) => {
                alert('Erro ao enviar email de recuperação: ' + error.message);
            });
    });

    // Seletor do botão de registrar
    const registerButton = document.getElementById('register-button');

    // Adiciona um evento de clique ao botão de registrar
    registerButton.addEventListener('click', function() {
        window.location.href = 'index.html'; // Redireciona para a página de login
    });
});
