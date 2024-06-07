<?php
require 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];

    $stmt = $pdo->prepare('DELETE FROM alunos WHERE id = ?');
    if ($stmt->execute([$id])) {
        echo 'Aluno deletado com sucesso!';
    } else {
        echo 'Erro ao deletar o aluno.';
    }
}
?>
