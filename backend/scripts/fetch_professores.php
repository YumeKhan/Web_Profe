<?php
require 'db_connection.php';

$stmt = $pdo->query('SELECT * FROM alunos');
$alunos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($alunos);
?>
