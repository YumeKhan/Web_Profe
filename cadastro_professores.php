<?php
require 'backend/scripts/db_connection.php';

$stmt = $pdo->query('SELECT * FROM professores');
$professores = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pesquisa de Professores Adicionados</title>
    <link rel="stylesheet" href="frontend/css/cadastro_de_professores.css">
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
        <section class="pesquisa-professores">
            <h2><img src="frontend/png/icon-professores.png" alt="Professores Icon"> Pesquisa de professores adicionados</h2>
            
            <table class="result-table">
                <tr>
                    <th>id</th>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>Disciplina</th>
                    <th>Nascimento</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                </tr>
                <?php foreach ($professores as $professor): ?>
                    <tr>
                        <td><img src="frontend/png/icon-adm.png" alt="Adm Icon"></td>
                        <td><input type="text" value="<?php echo htmlspecialchars($professor['nome']); ?>"></td>
                        <td><input type="text" value="<?php echo htmlspecialchars($professor['sobrenome']); ?>"></td>
                        <td><input type="text" value="<?php echo htmlspecialchars($professor['disciplina']); ?>"></td>
                        <td><input type="date" value="<?php echo htmlspecialchars($professor['nascimento']); ?>"></td>
                        <td><input type="email" value="<?php echo htmlspecialchars($professor['email']); ?>"></td>
                        <td><input type="text" value="<?php echo htmlspecialchars($professor['telefone']); ?>"></td>
                        <td><button class="update-button" data-id="<?php echo $professor['id']; ?>">Atualizar</button></td>
                    </tr>
                <?php endforeach; ?>
            </table>
            <div class="pagination">
                <button disabled>&laquo;</button>
                <button disabled>&lsaquo;</button>
                <span>1</span>
                <button disabled>&rsaquo;</button>
                <button disabled>&raquo;</button>
            </div>
        </section>
    </main>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const menuIcon = document.querySelector('.menu-icon');
            const headerButtons = document.querySelector('.header-buttons');

            menuIcon.addEventListener('click', function () {
                headerButtons.classList.toggle('show');
            });

            const logoutButton = document.querySelector('.logout-button');
            logoutButton.addEventListener('click', function () {
                window.location.href = 'index.php';
            });

            const classesButton = document.querySelector('.proclasses-button');
            classesButton.addEventListener('click', function () {
                window.location.href = 'classes.php';
            });

            const updateButtons = document.querySelectorAll('.update-button');
            updateButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const row = button.parentNode.parentNode;
                    const inputs = row.querySelectorAll('input');
                    const data = {
                        id: button.dataset.id,
                        nome: inputs[0].value,
                        sobrenome: inputs[1].value,
                        disciplina: inputs[2].value,
                        nascimento: inputs[3].value,
                        email: inputs[4].value,
                        telefone: inputs[5].value
                    };
                    fetch('backend/scripts/update_professores.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'success') {
                            alert('Dados atualizados com sucesso!');
                        }
                    });
                });
            });
        });
    </script>
</body>
<footer>
    <p class="creditos">Desenvolvido por ©Déborah Iara - 2024.</p>
</footer>
</html>
