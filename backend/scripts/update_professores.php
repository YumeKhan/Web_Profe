<?php
require 'db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'];
$nome = $data['nome'];
$sobrenome = $data['sobrenome'];
$disciplina = $data['disciplina'];
$nascimento = $data['nascimento'];
$email = $data['email'];
$telefone = $data['telefone'];

$stmt = $pdo->prepare('UPDATE professores SET nome = ?, sobrenome = ?, disciplina = ?, nascimento = ?, email = ?, telefone = ? WHERE id = ?');
$stmt->execute([$nome, $sobrenome, $disciplina, $nascimento, $email, $telefone, $id]);

echo json_encode(['status' => 'success']);
?>
