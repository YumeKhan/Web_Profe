<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Matricular Alunos</title>
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
        <section class="matricular-alunos">
            <h2>Matricular alunos</h2>
            <p>Para matricular um aluno, preencha todos os campos abaixo e confirme.</p>
            <form action="backend/scripts/insert_aluno.php" method="post">
                <div class="form-group">
                    <label for="nome"><img src="frontend/png/icon-nome.png" alt="Nome Icon"> Nome</label>
                    <input type="text" id="nome" name="nome" required>
                    <label for="sobrenome"><img src="frontend/png/icon-sobrenome.png" alt="Sobrenome Icon"> Sobrenome</label>
                    <input type="text" id="sobrenome" name="sobrenome" required>
                </div>
                <div class="form-group">
                    <label for="email"><img src="frontend/png/icon-email.png" alt="Email Icon"> Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="senha"><img src="frontend/png/icon-senha.png" alt="Senha Icon"> Senha</label>
                    <input type="password" id="senha" name="senha" required>
                    <label for="telefone"><img src="frontend/png/icon-telefone.png" alt="Telefone Icon"> Telefone</label>
                    <input type="tel" id="telefone" name="telefone" required>
                </div>
                <div class="form-group">
                    <label for="data-nascimento"><img src="frontend/png/icon-data.png" alt="Data Icon"> Data de Nascimento</label>
                    <input type="date" id="data-nascimento" name="data-nascimento" required>
                </div>
                <button type="submit" class="cadastrar-button">CADASTRAR</button>
            </form>
            <img src="frontend/png/student-img.png" alt="Student Image" class="student-image">
        </section>
    </main>
</body>
</html>
