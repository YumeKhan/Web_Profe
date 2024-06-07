document.addEventListener('DOMContentLoaded', function () {
    // ... (restante do código JavaScript) ...

    // Função para adicionar linha com botões de editar e excluir
    function adicionarLinha(tabela, aluno, dados) {
        const newRow = tabela.insertRow();
        newRow.insertCell().textContent = aluno.nome + ' ' + aluno.sobrenome;
        dados.forEach(dado => {
            const newCell = newRow.insertCell();
            newCell.innerHTML = `<input type="text" value="${dado}">`;
        });

        // Célula para os botões de editar e excluir
        const actionCell = newRow.insertCell();

        // Botão de editar com ícone
        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.innerHTML = '<img src="../png/excluir.png" alt="Editar">';
        editButton.addEventListener('click', function () {
            // Lógica para editar o aluno
            console.log('Editando aluno:', aluno.nome + ' ' + aluno.sobrenome);
        });
        actionCell.appendChild(editButton);

        // Botão de excluir com ícone
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = '<img src="../png/excluir.png" alt="Excluir">';
        deleteButton.addEventListener('click', function () {
            // Lógica para excluir o aluno
            if (confirm('Tem certeza de que deseja excluir este aluno?')) {
                newRow.remove();
                salvarDados();
            }
        });
        actionCell.appendChild(deleteButton);
    }

    // ... (restante do código JavaScript) ...

    carregarDados();
});

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

    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            window.location.href = 'index.html';
        });
    }

    if (profButton) {
        profButton.addEventListener('click', function () {
            window.location.href = 'cadastro de professores.html';
        });
    }

    if (inserirButton) {
        inserirButton.addEventListener('click', function () {
            window.location.href = 'inserir alunos.html';
        });
    }

    if (classesButton) {
        classesButton.addEventListener('click', function () {
            window.location.href = 'classes.html';
        });
    }

    if (matriButton) {
        matriButton.addEventListener('click', function () {
            window.location.href = 'matricula de alunos.html';
        });
    }

    if (addStudentButton) {
        addStudentButton.addEventListener('click', function () {
            window.location.href = 'cadastro_alunos.php';
        });
    }

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
            salvarDados();
        });
        deleteCell.appendChild(deleteButton);
    }

    function carregarDados() {
        const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
        const notasData = JSON.parse(localStorage.getItem('notasData')) || [];
        const faltasData = JSON.parse(localStorage.getItem('faltasData')) || [];

        alunos.forEach(aluno => {
            let notas = notasData.find(dado => dado.aluno === aluno.nome + ' ' + aluno.sobrenome);
            if (!notas) {
                notas = { aluno: aluno.nome + ' ' + aluno.sobrenome, notas: ['', '', '', ''] };
                notasData.push(notas);
            }
            let faltas = faltasData.find(dado => dado.aluno === aluno.nome + ' ' + aluno.sobrenome);
            if (!faltas) {
                faltas = { aluno: aluno.nome + ' ' + aluno.sobrenome, faltas: ['', '', '', ''] };
                faltasData.push(faltas);
            }

            adicionarLinha(notasTable, aluno, notas.notas);
            adicionarLinha(faltasTable, aluno, faltas.faltas);
        });

        localStorage.setItem('notasData', JSON.stringify(notasData));
        localStorage.setItem('faltasData', JSON.stringify(faltasData));
    }

    function salvarDados() {
        const notasData = Array.from(notasTable.rows)
            .slice(1)
            .map(row => ({
                aluno: row.cells[0].textContent,
                notas: Array.from(row.cells).slice(1, 5).map(cell => cell.firstChild.value)
            }));
        const faltasData = Array.from(faltasTable.rows)
            .slice(1)
            .map(row => ({
                aluno: row.cells[0].textContent,
                faltas: Array.from(row.cells).slice(1, 5).map(cell => cell.firstChild.value)
            }));

        localStorage.setItem('notasData', JSON.stringify(notasData));
        localStorage.setItem('faltasData', JSON.stringify(faltasData));
    }

    if (adicionarAlunosButton) {
        adicionarAlunosButton.addEventListener('click', function () {
            const nome = prompt('Digite o nome do aluno:');
            const sobrenome = prompt('Digite o sobrenome do aluno:');
            if (nome && sobrenome) {
                const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
                const aluno = { nome, sobrenome };
                alunos.push(aluno);
                localStorage.setItem('alunos', JSON.stringify(alunos));
                carregarDados();
            }
        });
    }

    if (atualizarButton) {
        atualizarButton.addEventListener('click', function () {
            salvarDados();
        });
    }

    if (editarButton) {
        editarButton.addEventListener('click', function () {
            console.log("Editando faltas...");
        });
    }

    carregarDados();
});

document.addEventListener("DOMContentLoaded", function() {
            
    // Seletores dos botões e tabelas
    const atualizarButton = document.querySelector('.atualizar-button');
    const editarButton = document.querySelector('.editar-button');
    const adicionarAlunosButton = document.querySelector('.adicionar-alunos-button');
    const notasTable = document.querySelector('.notas table');
    const faltasTable = document.querySelector('.faltas table');

    // Função para adicionar linha à tabela
    function adicionarLinha(tabela, aluno, notas) {
        const newRow = tabela.insertRow();
        newRow.insertCell().textContent = aluno;
        notas.forEach(nota => {
            const newCell = newRow.insertCell();
            newCell.innerHTML = `<input type="text" value="${nota}">`;
        });
        const deleteCell = newRow.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir'; 
        deleteButton.addEventListener('click', function() {
            newRow.remove();
            salvarDados();
        });
        deleteCell.appendChild(deleteButton);

    }

    // Função para carregar dados do localStorage
    function carregarDados() {
        const notasData = JSON.parse(localStorage.getItem('notasData')) || [];
        const faltasData = JSON.parse(localStorage.getItem('faltasData')) || [];

        notasData.forEach(dado => adicionarLinha(notasTable, dado.aluno, dado.notas));
        faltasData.forEach(dado => adicionarLinha(faltasTable, dado.aluno, dado.faltas));
    }

    // Função para salvar dados no localStorage
    function salvarDados() {
        const notasData = Array.from(notasTable.rows)
            .slice(1)
            .map(row => ({
                aluno: row.cells[0].textContent,
                notas: Array.from(row.cells).slice(1, 5).map(cell => cell.firstChild.value)
            }));
        const faltasData = Array.from(faltasTable.rows)
            .slice(1)
            .map(row => ({
                aluno: row.cells[0].textContent,
                faltas: Array.from(row.cells).slice(1, 5).map(cell => cell.firstChild.value)
            }));

        localStorage.setItem('notasData', JSON.stringify(notasData));
        localStorage.setItem('faltasData', JSON.stringify(faltasData));
    }

    // Adicionar evento de clique ao botão de adicionar mais alunos
    adicionarAlunosButton.addEventListener('click', function() {
        const aluno = prompt('Digite o nome do aluno:');
        if (aluno) {
            adicionarLinha(notasTable, aluno, ['', '', '', '']);
            adicionarLinha(faltasTable, aluno, ['', '', '', '']);
            salvarDados();
        }
    });

    // Adicionar evento de clique ao botão de atualizar notas
    atualizarButton.addEventListener('click', function() {
        salvarDados();
    });

    // Adicionar evento de clique ao botão de editar faltas
    editarButton.addEventListener('click', function() {
        console.log("Editando faltas...");
        // Aqui você pode implementar a lógica para editar as faltas
    });

    carregarDados();
});