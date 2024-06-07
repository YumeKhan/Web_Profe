// Função para abrir o calendário para um aluno
function openCalendar(id) {
    // Crie um input de texto oculto para armazenar a data selecionada
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'datepicker';
    input.style.display = 'none';
    document.body.appendChild(input);

    // Abra o calendário usando o jQuery UI
    $('#datepicker').datepicker({
        onSelect: function(dateText) {
            alert('Data selecionada: ' + dateText);
            // Aqui você pode adicionar a lógica para salvar a data selecionada no banco de dados ou fazer outras operações
            // Por exemplo, você pode chamar uma função para atualizar a data de nascimento do aluno com o ID fornecido
            updateDataNascimento(id, dateText);
        },
        onClose: function() {
            // Remova o input de texto quando o calendário for fechado
            $('#datepicker').remove();
        }
    }).datepicker('show');
}

// Função para atualizar a data de nascimento do aluno no banco de dados
function updateDataNascimento(id, novaDataNascimento) {
    // Implemente a lógica para atualizar a data de nascimento do aluno com o ID fornecido
    alert('Atualizar data de nascimento do aluno com ID ' + id + ' para ' + novaDataNascimento);
}

document.addEventListener("DOMContentLoaded", function() {

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

    
});