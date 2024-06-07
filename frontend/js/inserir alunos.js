// ...

// Evento para enviar os dados de matrícula do aluno
const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio do formulário

    // Cria um objeto com os dados do aluno
    const aluno = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        telefone: document.getElementById('telefone').value,
        dataNascimento: document.getElementById('data-nascimento').value
    };

    // Converte o objeto para uma string JSON
    const jsonAluno = JSON.stringify(aluno);

    // Envia uma requisição para o PHP
    fetch('inserir_aluno.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonAluno
    })
    .then(response => response.text())
    .then(text => {
        alert(text); // Exibe a mensagem de sucesso ou erro
        // Limpa os campos do formulário
        document.getElementById('nome').value = '';
        document.getElementById('sobrenome').value = '';
        document.getElementById('email').value = '';
        document.getElementById('senha').value = '';
        document.getElementById('telefone').value = '';
        document.getElementById('data-nascimento').value = '';
    })
    .catch(error => {
        console.error('Erro ao enviar dados:', error);
        alert('Ocorreu um erro ao enviar os dados do aluno.');
    });
});

// ...