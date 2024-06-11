document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const headerButtons = document.querySelector('.header-buttons');

    menuIcon.addEventListener('click', function () {
        headerButtons.classList.toggle('show');
    });

    const logoutButton = document.querySelector('.logout-button');
    const profButton = document.querySelector('.proprof-button');
    const inserirButton = document.querySelector('.proinserir-button');
    const classesButton = document.querySelector('.proclasses-button');
    const matriButton = document.querySelector('.promatri-button');

    logoutButton.addEventListener('click', function () {
        window.location.href = 'login.html';
    });

    profButton.addEventListener('click', function () {
        window.location.href = 'cadastro de professores.html';
    });

    inserirButton.addEventListener('click', function () {
        window.location.href = 'inserir alunos.html';
    });

    classesButton.addEventListener('click', function () {
        window.location.href = 'classes.html';
    });

    matriButton.addEventListener('click', function () {
        window.location.href = 'matricula de alunos.html';
    });

    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const nome = document.getElementById('nome').value;
            const sobrenome = document.getElementById('sobrenome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const telefone = document.getElementById('telefone').value;
            const dataNascimento = document.getElementById('data-nascimento').value;

            console.log('Nome:', nome);
            console.log('Sobrenome:', sobrenome);
            console.log('Email:', email);
            console.log('Senha:', senha);
            console.log('Telefone:', telefone);
            console.log('Data de Nascimento:', dataNascimento);

            // Aqui você pode enviar os dados do aluno para o servidor
            // usando uma requisição AJAX ou outra técnica
        });
    }

    const atualizarButton = document.querySelector('.atualizar-button');
    const editarButton = document.querySelector('.editar-button');
    const adicionarAlunosButton = document.querySelector('.adicionar-alunos-button');
    const notasTable = document.querySelector('.notas table');
    const faltasTable = document.querySelector('.faltas table');

    function adicionarLinha(tabela, aluno, dados) {
        const newRow = tabela.insertRow();
        newRow.insertCell().textContent = aluno.nome + ' ' + aluno.sobrenome;
        dados.forEach(dado => {
            const newCell = newRow.insertCell();
            newCell.innerHTML = `<input type="text" value="${dado}">`;
        });
        const deleteCell = newRow.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function () {
            newRow.remove();
            // salvarDados(); // Comentei essa linha porque a função salvarDados não foi fornecida
        });
        deleteCell.appendChild(deleteButton);
    }

    // Função para carregar os alunos do banco de dados
    function carregarAlunos() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var alunos = JSON.parse(this.responseText);
                preencherTabela(alunos);
            }
        };
        xhttp.open("GET", "buscar_alunos.php", true);
        xhttp.send();
    }

    // Função para preencher a tabela com os dados dos alunos
    function preencherTabela(alunos) {
        var tabela = document.querySelector('.result-table');

        alunos.forEach(function(aluno) {
            var linha = tabela.insertRow();

            // Criar células para cada coluna
            var celulaId = linha.insertCell(0);
            var celulaNome = linha.insertCell(1);
            var celulaSobrenome = linha.insertCell(2);
            var celulaNascimento = linha.insertCell(3);
            var celulaEmail = linha.insertCell(4);
            var celulaTelefone = linha.insertCell(5);
            var celulaExcluir = linha.insertCell(6);

            // Preencher as células com os dados do aluno
            celulaId.textContent = aluno.id; // Assumindo que o ID é uma coluna na tabela alunos
            celulaNome.textContent = aluno.nome;
            celulaSobrenome.textContent = aluno.sobrenome;
            celulaNascimento.textContent = aluno.data_nascimento; // Ajuste o nome do campo conforme necessário
            celulaEmail.textContent = aluno.email;
            celulaTelefone.textContent = aluno.telefone;

            // Criar botão de exclusão
            var btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.onclick = function() {
                excluirAluno(aluno.id); // Chamar a função de exclusão com o ID do aluno
            };
            celulaExcluir.appendChild(btnExcluir);
        });
    }

    // Função para excluir um aluno pelo ID
    function excluirAluno(id) {
        // Envia uma requisição para o PHP para excluir o aluno
        fetch('excluir_aluno.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        .then(response => response.text())
        .then(text => {
            alert(text); // Exibe a mensagem de sucesso ou erro
            // Recarrega a tabela para refletir a exclusão
            carregarAlunos();
        })
        .catch(error => {
            console.error('Erro ao excluir aluno:', error);
            alert('Ocorreu um erro ao excluir o aluno.');
        });
    }

    // Carregar os alunos assim que a página é carregada
    carregarAlunos();
});