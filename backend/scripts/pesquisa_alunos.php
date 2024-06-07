<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pesquisa de Alunos Matriculados</title>
    <link rel="stylesheet" href="frontend/css/cadastro_de_alunos.css">
</head>
<body>
    <header>
        <div class="menu-icon">☰</div>
        <div class="header-buttons">
            <button class="profile-button">PERFIL</button>
            <button class="logout-button">SAIR</button>
        </div>
    </header>
    <main>
        <section class="pesquisa-alunos">
            <h2><img src="frontend/png/icon-alunos.png" alt="Alunos Icon"> Pesquisa de alunos matriculados</h2>
            <table class="search-table">
                <tr>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                </tr>
            </table>
            <table class="result-table">
                <tr>
                    <th>Matrícula</th>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>Nascimento</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                </tr>
            </table>
            <div class="pagination">
                <button disabled>&laquo;</button>
                <button disabled>&lsaquo;</button>
                <span>1</span>
                <button disabled>&rsaquo;</button>
                <button disabled>&raquo;</button>
            </div>
            <button class="add-student-button">ADICIONAR ALUNO</button>
        </section>
    </main>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            fetch('backend/scripts/fetch_alunos.php')
                .then(response => response.json())
                .then(data => {
                    const resultTable = document.querySelector('.result-table');
                    data.forEach(aluno => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td><img src="frontend/png/icon-user.png" alt="User Icon"></td>
                            <td>${aluno.id}</td>
                            <td>${aluno.nome}</td>
                            <td>${aluno.sobrenome}</td>
                            <td>${aluno.data_nascimento}</td>
                            <td>${aluno.email}</td>
                            <td>${aluno.telefone}</td>
                            <td>
                                <button class="action-button edit" data-id="${aluno.id}">✏️</button>
                                <button class="action-button delete" data-id="${aluno.id}">🗑️</button>
                                <button class="action-button calendar">📅</button>
                            </td>
                        `;
                        resultTable.appendChild(row);
                    });

                    document.querySelectorAll('.edit').forEach(button => {
                        button.addEventListener('click', function () {
                            const id = this.dataset.id;
                            // Implementar lógica de edição aqui
                        });
                    });

                    document.querySelectorAll('.delete').forEach(button => {
                        button.addEventListener('click', function () {
                            const id = this.dataset.id;
                            fetch('backend/scripts/delete_aluno.php', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                body: `id=${id}`
                            })
                            .then(response => response.text())
                            .then(data => {
                                alert(data);
                                location.reload();
                            });
                        });
                    });
                });

            document.querySelector('.add-student-button').addEventListener('click', function () {
                window.location.href = 'cadastro_alunos.php';
            });
        });
    </script>
</body>
</html>
