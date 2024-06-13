document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const headerButtons = document.querySelector('.header-buttons');

    menuIcon.addEventListener('click', function () {
        headerButtons.classList.toggle('show');
    });

    const buttons = [
        { selector: '.logout-button', url: 'login.html' },
        { selector: '.proprof-button', url: 'cadastro de professores.html' },
        { selector: '.proinserir-button', url: 'inserir alunos.html' },
        { selector: '.proclasses-button', url: 'classes.html' },
        { selector: '.promatri-button', url: 'matricula de alunos.html' },
    ];

    buttons.forEach(button => {
        const element = document.querySelector(button.selector);
        if (element) {
            element.addEventListener('click', function () {
                window.location.href = button.url;
            });
        }
    });

    // Função para atualizar a nota de um aluno
    window.atualizarNota = function (input, aluno_id, bimestre) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText); // Debug
            } else if (this.readyState == 4) {
                console.error('Erro ao atualizar nota:', this.responseText); // Debug
            }
        };
        xhttp.open("POST", "salvar_notas_faltas.php", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        var data = JSON.stringify({
            action: "saveNota",
            aluno_id: aluno_id,
            bimestre: bimestre,
            nota: input.value
        });
        xhttp.send(data);
    };

    // Função para atualizar a falta de um aluno
    window.atualizarFalta = function (input, aluno_id, bimestre) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText); // Debug
            } else if (this.readyState == 4) {
                console.error('Erro ao atualizar falta:', this.responseText); // Debug
            }
        };
        xhttp.open("POST", "salvar_notas_faltas.php", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        var data = JSON.stringify({
            action: "saveFalta",
            aluno_id: aluno_id,
            bimestre: bimestre,
            falta: input.value
        });
        xhttp.send(data);
    };

    // Função para carregar os alunos do banco de dados
    function carregarAlunos() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var alunos = JSON.parse(this.responseText);
                preencherTabelas(alunos);
            }
        };
        xhttp.open("GET", "buscar_alunos.php", true);
        xhttp.send();
    }

    const notasTableBody = document.querySelector('.notas table tbody');
    const faltasTableBody = document.querySelector('.faltas table tbody');
    const salvarNotasButton = document.querySelector('.adicionar-alunos-button');
    const salvarFaltasButton = document.querySelector('.editar-button');

    // Função para preencher as tabelas com os dados dos alunos
    function preencherTabelas(alunos) {
        alunos.forEach(function (aluno) {
            // Criar linha para a tabela de notas
            var linhaNotas = notasTableBody.insertRow();
            var celulaNomeNotas = linhaNotas.insertCell(0);
            celulaNomeNotas.textContent = aluno.nome + ' ' + aluno.sobrenome;

            // Criar campos de entrada para notas
            for (var i = 1; i <= 4; i++) {
                var celulaNota = linhaNotas.insertCell(i);
                var inputNota = document.createElement('input');
                inputNota.type = 'number';
                inputNota.step = '0.1'; // Permite notas com uma casa decimal
                inputNota.style.width = '60px'; // Ajuste a largura conforme necessário
                inputNota.style.boxSizing = 'border-box'; // Inclui o padding e borda na largura total
                celulaNota.appendChild(inputNota);
            }

            // Criar linha para a tabela de faltas
            var linhaFaltas = faltasTableBody.insertRow();
            var celulaNomeFaltas = linhaFaltas.insertCell(0);
            celulaNomeFaltas.textContent = aluno.nome + ' ' + aluno.sobrenome;

            // Criar campos de entrada para faltas
            for (var i = 1; i <= 4; i++) {
                var celulaFalta = linhaFaltas.insertCell(i);
                var inputFalta = document.createElement('input');
                inputFalta.type = 'number';
                inputFalta.style.width = '60px'; // Ajuste a largura conforme necessário
                inputFalta.style.boxSizing = 'border-box'; // Inclui o padding e borda na largura total
                celulaFalta.appendChild(inputFalta);
            }
        });
    }

    // Função para salvar as notas e faltas no banco de dados
    function salvarDados(event) {
        event.preventDefault(); // Impede que o formulário seja enviado tradicionalmente

        // Lógica para salvar as notas e faltas no banco de dados
        console.log('Salvando dados...');

        // Exemplo de como você pode enviar os dados para um backend PHP
        var notas = [];
        var faltas = [];

        // Percorrer as linhas da tabela de notas e coletar os valores
        for (var i = 0; i < notasTableBody.rows.length; i++) {
            var aluno_id = notasTableBody.rows[i].cells[0].textContent; // Assumindo que o ID do aluno é o primeiro campo
            var bimestre1 = notasTableBody.rows[i].cells[1].firstChild.value;
            var bimestre2 = notasTableBody.rows[i].cells[2].firstChild.value;
            var bimestre3 = notasTableBody.rows[i].cells[3].firstChild.value;
            var bimestre4 = notasTableBody.rows[i].cells[4].firstChild.value;
            notas.push({ aluno_id: aluno_id, bimestre1: bimestre1, bimestre2: bimestre2, bimestre3: bimestre3, bimestre4: bimestre4 });
        }

        // Percorrer as linhas da tabela de faltas e coletar os valores
        for (var i = 0; i < faltasTableBody.rows.length; i++) {
            var aluno_id = faltasTableBody.rows[i].cells[0].textContent; // Assumindo que o ID do aluno é o primeiro campo
            var bimestre1 = faltasTableBody.rows[i].cells[1].firstChild.value;
            var bimestre2 = faltasTableBody.rows[i].cells[2].firstChild.value;
            var bimestre3 = faltasTableBody.rows[i].cells[3].firstChild.value;
            var bimestre4 = faltasTableBody.rows[i].cells[4].firstChild.value;
            faltas.push({ aluno_id: aluno_id, bimestre1: bimestre1, bimestre2: bimestre2, bimestre3: bimestre3, bimestre4: bimestre4 });
        }

        // Enviar os dados para o backend
        fetch('salvar_notas_faltas.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ notas: notas, faltas: faltas })
        })
            .then(response => response.text())
            .then(text => {
                alert(text); // Exibe a mensagem de sucesso ou erro
            })
            .catch(error => {
                console.error('Erro ao salvar dados:', error);
                alert('Ocorreu um erro ao salvar os dados.');
            });
    }

    // Adicionando eventos para os botões de salvar
    if (salvarNotasButton) {
        salvarNotasButton.addEventListener('click', salvarDados);
    }

    if (salvarFaltasButton) {
        salvarFaltasButton.addEventListener('click', salvarDados);
    }

    // Carregar os alunos ao carregar a página
    carregarAlunos();
});
