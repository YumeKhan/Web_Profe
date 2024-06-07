<?php
require 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $nome = $_POST['nome'];
    $sobrenome = $_POST['sobrenome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $data_nascimento = $_POST['data_nascimento'];

    $stmt = $pdo->prepare('UPDATE alunos SET nome = ?, sobrenome = ?, email = ?, telefone = ?, data_nascimento = ? WHERE id = ?');
    if ($stmt->execute([$nome, $sobrenome, $email, $telefone, $data_nascimento, $id])) {
        echo 'Aluno atualizado com sucesso!';
    } else {
        echo 'Erro ao atualizar o aluno.';
    }
}
?>
