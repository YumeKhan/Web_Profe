// Evento para enviar os dados de matrícula do aluno
document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const headerButtons = document.querySelector('.header-buttons');

    menuIcon.addEventListener('click', function () {
        headerButtons.classList.toggle('show');
    });

    // Adiciona evento ao botão de logout para redirecionar para index.html
    const logoutButton = document.querySelector('.logout-button');
    logoutButton.addEventListener('click', function () {
        window.location.href = 'login.html';
    });

    // Adiciona evento ao botão de professores para redirecionar para cadastro de professores
    const profButton = document.querySelector('.proprof-button');
    profButton.addEventListener('click', function () {
        window.location.href = 'cadastro de professores.html';
    });

    // Adiciona evento ao botão de inserir alunos para redirecionar para inserir alunos.html
    const inserirButton = document.querySelector('.proinserir-button');
    inserirButton.addEventListener('click', function () {
        window.location.href = 'inserir alunos.html';
    });

    // Adiciona evento ao botão de classes para redirecionar para classes.html
    const classesButton = document.querySelector('.proclasses-button');
    classesButton.addEventListener('click', function () {
        window.location.href = 'classes.html';
    });

    // Adiciona evento ao botão de matrícula de alunos para redirecionar para matricula de alunos.html
    const matriButton = document.querySelector('.promatri-button');
    matriButton.addEventListener('click', function () {
        window.location.href = 'matricula de alunos.html';
    });

    // Evento para adicionar um novo aluno
    const addStudentButton = document.querySelector('.add-student-button');
    addStudentButton.addEventListener('click', function () {
        window.location.href = 'cadastro_alunos.php';
    });

    // Função para editar um aluno
    function editAluno(id) {
        // Implementar lógica de edição aqui
        alert('Editar aluno com ID: ' + id);
    }

    // Função para deletar um aluno
    function deleteAluno(id) {
        // Implementar lógica de exclusão aqui
        alert('Excluir aluno com ID: ' + id);
    }

    // Função para abrir o calendário para um aluno
    function openCalendar(id) {
        // Implementar lógica para abrir o calendário para o aluno com o ID fornecido
        alert('Abrir calendário para o aluno com ID: ' + id);
    }

});

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