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

    function preencherTabelaNotas() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText); // Debug
                var alunos = JSON.parse(this.responseText);
                var tbodyNotas = document.querySelector(".notas table tbody");
                var tbodyFaltas = document.querySelector(".faltas table tbody");

                // Limpa as tabelas antes de preenchê-las novamente
                tbodyNotas.innerHTML = "";
                tbodyFaltas.innerHTML = "";

                alunos.forEach(function(aluno) {
                    var trNotas = document.createElement("tr");
                    var trFaltas = document.createElement("tr");

                    trNotas.innerHTML = `
                        <td>${aluno.nome} ${aluno.sobrenome}</td>
                        <td><input type="text" name="bimestre1" value="${aluno.bimestre1 ?? 'Inserir a Nota'}" onchange="atualizarNota(this, ${aluno.id}, 'bimestre1')"></td>
                        <td><input type="text" name="bimestre2" value="${aluno.bimestre2 ?? 'Inserir a Nota'}" onchange="atualizarNota(this, ${aluno.id}, 'bimestre2')"></td>
                        <td><input type="text" name="bimestre3" value="${aluno.bimestre3 ?? 'Inserir a Nota'}" onchange="atualizarNota(this, ${aluno.id}, 'bimestre3')"></td>
                        <td><input type="text" name="bimestre4" value="${aluno.bimestre4 ?? 'Inserir a Nota'}" onchange="atualizarNota(this, ${aluno.id}, 'bimestre4')"></td>
                    `;

                    trFaltas.innerHTML = `
                        <td>${aluno.nome} ${aluno.sobrenome}</td>
                        <td><input type="text" name="falta1" value="${aluno.falta1 ?? 'Inserir a Nota'}" onchange="atualizarFalta(this, ${aluno.id}, 'falta1')"></td>
                        <td><input type="text" name="falta2" value="${aluno.falta2 ?? 'Inserir a Nota'}" onchange="atualizarFalta(this, ${aluno.id}, 'falta2')"></td>
                        <td><input type="text" name="falta3" value="${aluno.falta3 ?? 'Inserir a Nota'}" onchange="atualizarFalta(this, ${aluno.id}, 'falta3')"></td>
                        <td><input type="text" name="falta4" value="${aluno.falta4 ?? 'Inserir a Nota'}" onchange="atualizarFalta(this, ${aluno.id}, 'falta4')"></td>
                    `;

                    tbodyNotas.appendChild(trNotas);
                    tbodyFaltas.appendChild(trFaltas);
                });
            } else if (this.readyState == 4) {
                console.error('Erro ao carregar dados:', this.responseText); // Debug
            }
        };
        xhttp.open("GET", "classes.php", true);
        xhttp.send();
    }

    window.atualizarNota = function(input, aluno_id, bimestre) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText); // Debug
                preencherTabelaNotas();
            } else if (this.readyState == 4) {
                console.error('Erro ao atualizar nota:', this.responseText); // Debug
            }
        };
        xhttp.open("POST", "classes.php", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        var data = JSON.stringify({
            action: "saveNota",
            aluno_id: aluno_id,
            bimestre: bimestre,
            nota: input.value
        });
        xhttp.send(data);
    };

    window.atualizarFalta = function(input, aluno_id, bimestre) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText); // Debug
                preencherTabelaNotas();
            } else if (this.readyState == 4) {
                console.error('Erro ao atualizar falta:', this.responseText); // Debug
            }
        };
        xhttp.open("POST", "classes.php", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        var data = JSON.stringify({
            action: "saveFalta",
            aluno_id: aluno_id,
            bimestre: bimestre,
            falta: input.value
        });
        xhttp.send(data);
    };

    // Inicializa a tabela de notas e faltas ao carregar a página
    preencherTabelaNotas();
});
