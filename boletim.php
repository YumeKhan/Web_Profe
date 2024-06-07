<?php
// boletim.php
require 'backend/config/db.php';

// Fetch alunos
$stmt_alunos = $pdo->query('SELECT * FROM alunos');
$alunos = $stmt_alunos->fetchAll();

// Fetch notas
$stmt_notas = $pdo->query('SELECT * FROM notas');
$notas = $stmt_notas->fetchAll(PDO::FETCH_GROUP|PDO::FETCH_ASSOC);

// Fetch faltas
$stmt_faltas = $pdo->query('SELECT * FROM faltas');
$faltas = $stmt_faltas->fetchAll(PDO::FETCH_GROUP|PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Boletim de Notas e Faltas</title>
    <link rel="stylesheet" href="frontend/css/classes.css">
    <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"></script>
</head>
<body>
    <header>
        <div class="menu-icon">☰</div>
        <div class="header-buttons">
            <button class="profile-button">PERFIL</button>
            <button class="proprof-button">PROFESSORES</button>
            <button class="proclasses-button">CLASSES</button>
            <button class="logout-button">SAIR</button>
        </div>
    </header>
    <main>
        <section class="notas">
            <h2><img src="frontend/png/icon-notas.png" alt="Boletim Icon"> Boletim de notas</h2>
            <table>
                <tr>
                    <th>Alunos</th>
                    <th>1º Bimestre</th>
                    <th>2º Bimestre</th>
                    <th>3º Bimestre</th>
                    <th>4º Bimestre</th>
                </tr>
                <?php foreach ($alunos as $aluno): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($aluno['nome']); ?></td>
                        <td><input type="text" value="<?php echo htmlspecialchars($notas[$aluno['id']][0]['bimestre1'] ?? ''); ?>"></td>
                        <td><input type="text" value="<?php echo htmlspecialchars($notas[$aluno['id']][0]['bimestre2'] ?? ''); ?>"></td>
                        <td><input type="text" value="<?php echo htmlspecialchars($notas[$aluno['id']][0]['bimestre3'] ?? ''); ?>"></td>
                        <td><input type="text" value="<?php echo htmlspecialchars($notas[$aluno['id']][0]['bimestre4'] ?? ''); ?>"></td>
                    </tr>
                <?php endforeach; ?>
            </table>
            <div class="buttons-container">
                <button class="atualizar-button">ATUALIZAR NOTAS</button>
                <button class="adicionar-alunos-button">ADICIONAR MAIS ALUNOS</button>
            </div>
        </section>
        <section class="faltas">
            <h2><img src="frontend/png/icon-faltas.png" alt="Faltas Icon"> Faltas</h2>
            <table>
                <tr>
                    <th>Alunos</th>
                    <th>1º Bimestre</th>
                    <th>2º Bimestre</th>
                    <th>3º Bimestre</th>
                    <th>4º Bimestre</th>
                </tr>
                <?php foreach ($alunos as $aluno): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($aluno['nome']); ?></td>
                        <td><input type="text" value="<?php echo htmlspecialchars($faltas[$aluno['id']][0]['bimestre1'] ?? ''); ?>"></td>
                        <td><input type="text" value="<?php echo htmlspecialchars($faltas[$aluno['id']][0]['bimestre2'] ?? ''); ?>"></td>
                        <td><input type="text" value="<?php echo htmlspecialchars($faltas[$aluno['id']][0]['bimestre3'] ?? ''); ?>"></td>
                        <td><input type="text" value="<?php echo htmlspecialchars($faltas[$aluno['id']][0]['bimestre4'] ?? ''); ?>"></td>
                    </tr>
                <?php endforeach; ?>
            </table>
            <div class="buttons-container">
                <button class="editar-button">EDITAR FALTAS</button>
            </div>
        </section>
    </main>

    <script src="frontend/js/classes.js"></script>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const atualizarButton = document.querySelector('.atualizar-button');
            const editarButton = document.querySelector('.editar-button');
            const adicionarAlunosButton = document.querySelector('.adicionar-alunos-button');
            const adicionarBimestreButton = document.querySelector('.adicionar-bimestre-button');
            const salvarButton = document.querySelector('.salvar-button');
            const notasTable = document.querySelector('.notas table');
            const faltasTable = document.querySelector('.faltas table');

            function carregarDados() {
                // Carregar dados usando AJAX
                fetch('backend/scripts/fetch_alunos.php')
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(row => adicionarLinha(notasTable, row));
                        data.forEach(row => adicionarLinha(faltasTable, row));
                    });
            }

            function salvarDados() {
                const notasData = [...notasTable.rows].slice(1).map(row => {
                    return {
                        aluno_id: row.cells[0].dataset.id,
                        bimestre1: row.cells[1].querySelector('input').value,
                        bimestre2: row.cells[2].querySelector('input').value,
                        bimestre3: row.cells[3].querySelector('input').value,
                        bimestre4: row.cells[4].querySelector('input').value,
                    };
                });
                const faltasData = [...faltasTable.rows].slice(1).map(row => {
                    return {
                        aluno_id: row.cells[0].dataset.id,
                        bimestre1: row.cells[1].querySelector('input').value,
                        bimestre2: row.cells[2].querySelector('input').value,
                        bimestre3: row.cells[3].querySelector('input').value,
                        bimestre4: row.cells[4].querySelector('input').value,
                    };
                });

                fetch('backend/scripts/update_notas_faltas.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ notas: notasData, faltas: faltasData }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        alert('Dados salvos com sucesso!');
                    }
                });
            }

            function adicionarLinha(tabela, valores = []) {
                const newRow = tabela.insertRow();
                valores.forEach((valor, index) => {
                    const newCell = newRow.insertCell();
                    if (index === 0) {
                        newCell.textContent = valor;
                    } else {
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.value = valor;
                        newCell.appendChild(input);
                    }
                });
            }

            adicionarAlunosButton.addEventListener('click', function() {
                adicionarLinha(notasTable, ['']);
                adicionarLinha(faltasTable, ['']);
                salvarDados();
            });

            adicionarBimestreButton.addEventListener('click', function() {
                const notasHeaders = notasTable.rows[0].cells;
                const faltasHeaders = faltasTable.rows[0].cells;

                const novoBimestre = notasHeaders.length;

                notasTable.rows[0].insertCell().textContent = `${novoBimestre}º Bimestre`;
                faltasTable.rows[0].insertCell().textContent = `${novoBimestre}º Bimestre`;

                for (let i = 1; i < notasTable.rows.length; i++) {
                    notasTable.rows[i].insertCell().innerHTML = '<input type="text">';
                    faltasTable.rows[i].insertCell().innerHTML = '<input type="text">';
                }
                salvarDados();
            });

            atualizarButton.addEventListener('click', function() {
                salvarDados();
            });

            editarButton.addEventListener('click', function() {
                for (let i = 1; i < faltasTable.rows.length; i++) {
                    const cells = faltasTable.rows[i].cells;
                    for (let j = 1; j < cells.length; j++) {
                        const cell = cells[j];
                        cell.innerHTML = `<input type="text" value="${cell.textContent.trim()}">`;
                        cell.firstChild.addEventListener('blur', function() {
                            cell.textContent = cell.firstChild.value;
                            salvarDados();
                        });
                    }
                }
            });

            salvarButton.addEventListener('click', function() {
                salvarDados();
                alert('Dados salvos com sucesso!');
            });

            carregarDados();
        });

        document.addEventListener('DOMContentLoaded', function () {
            const menuIcon = document.querySelector('.menu-icon');
            const headerButtons = document.querySelector('.header-buttons');

            menuIcon.addEventListener('click', function () {
                headerButtons.classList.toggle('show');
            });

            const profButton = document.querySelector('.proprof-button');
            profButton.addEventListener('click', function () {
                window.location.href = 'cadastro_professores.php';
            });

            const logoutButton = document.querySelector('.logout-button');
            logoutButton.addEventListener('click', function () {
                window.location.href = 'index.php';
            });
        });
    </script>
</body>
<footer>
    <p class="creditos">Desenvolvido por ©Déborah Iara - 2024.</p>
</footer>
</html>
