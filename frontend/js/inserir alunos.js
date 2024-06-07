// Evento para enviar os dados de matrícula do aluno
const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio do formulário
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const telefone = document.getElementById('telefone').value;
    const dataNascimento = document.getElementById('data-nascimento').value;

    // Cria um objeto com os dados do aluno
    const aluno = {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        senha: senha,
        telefone: telefone,
        dataNascimento: dataNascimento
    };

    // Salva o aluno no localStorage
    let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    alunos.push(aluno);
    localStorage.setItem('alunos', JSON.stringify(alunos));

    // Limpa os campos do formulário
    document.getElementById('nome').value = '';
    document.getElementById('sobrenome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('senha').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('data-nascimento').value = '';

    // Exibe uma mensagem de sucesso ou redireciona para outra página conforme necessário
    alert('Aluno cadastrado com sucesso!');
});

    document.addEventListener('DOMContentLoaded', function () {
        // Seleciona o formulário
        const form = document.querySelector('form');

        // Adiciona o evento de submissão do formulário
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Previne o comportamento padrão de recarregar a página

            // Coleta os dados do formulário
            const formData = new FormData(form);

            // Envia os dados para o backend usando fetch
            fetch('backend/scripts/matricular_aluno.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                alert(data); // Exibe a resposta do backend
                form.reset(); // Reseta o formulário após submissão bem-sucedida
            })
            .catch(error => console.error('Erro ao matricular aluno:', error));
        });

        // Evento para o botão de logout
        document.querySelector('.logout-button').addEventListener('click', function () {
            window.location.href = 'index.html';
        });

        // Evento para o botão de perfil (se necessário)
        document.querySelector('.profile-button').addEventListener('click', function () {
            window.location.href = 'profile.html';
        });
    });

    document.addEventListener("DOMContentLoaded", function() {
        // ... (restante do código)

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
            deleteButton.classList.add('delete-button'); // Adiciona classe CSS
            deleteButton.addEventListener('click', function() {
                newRow.remove();
                salvarDados();
            });
            deleteCell.appendChild(deleteButton);

            // Adiciona um atributo de dados com um ID único para a linha
            const id = Date.now().toString();
            newRow.dataset.id = id;

            // Atualiza o localStorage com o novo ID
            const notasData = JSON.parse(localStorage.getItem('notasData')) || [];
            const faltasData = JSON.parse(localStorage.getItem('faltasData')) || [];
            notasData.push({ id, aluno, notas });
            faltasData.push({ id, aluno, faltas: ['', '', '', ''] });
            localStorage.setItem('notasData', JSON.stringify(notasData));
            localStorage.setItem('faltasData', JSON.stringify(faltasData));
        }

        // Função para salvar dados no localStorage
        function salvarDados() {
            const notasData = Array.from(notasTable.rows)
                .slice(1)
                .map(row => ({
                    id: row.dataset.id,
                    aluno: row.cells[0].textContent,
                    notas: Array.from(row.cells).slice(1, 5).map(cell => cell.firstChild.value)
                }));
            const faltasData = Array.from(faltasTable.rows)
                .slice(1)
                .map(row => ({
                    id: row.dataset.id,
                    aluno: row.cells[0].textContent,
                    faltas: Array.from(row.cells).slice(1, 5).map(cell => cell.firstChild.value)
                }));

            // Remove itens do localStorage que não estão mais nas tabelas
            const notasDataIds = notasData.map(item => item.id);
            const faltasDataIds = faltasData.map(item => item.id);
            const oldNotasData = JSON.parse(localStorage.getItem('notasData')) || [];
            const oldFaltasData = JSON.parse(localStorage.getItem('faltasData')) || [];
            oldNotasData.forEach(item => {
                if (!notasDataIds.includes(item.id)) {
                    localStorage.removeItem(`nota_${item.id}`);
                }
            });
            oldFaltasData.forEach(item => {
                if (!faltasDataIds.includes(item.id)) {
                    localStorage.removeItem(`falta_${item.id}`);
                }
            });

            localStorage.setItem('notasData', JSON.stringify(notasData));
            localStorage.setItem('faltasData', JSON.stringify(faltasData));
        }

        // ... (restante do código)
    });