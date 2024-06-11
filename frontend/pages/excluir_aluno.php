<?php
// excluir_aluno.php

// Configurações de conexão com o banco de dados
$host = 'localhost';
$dbname = 'alunos_db';
$username = 'root';
$password = '';

// Criar a conexão com o banco de dados
$conn = new mysqli($host, $username, $password, $dbname);

// Verificar se há algum erro na conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Ler os dados JSON do corpo da requisição
$data = json_decode(file_get_contents('php://input'), true);

// Preparar a consulta SQL para exclusão
$sql = "DELETE FROM alunos WHERE id = ?";
$stmt = $conn->prepare($sql);

// Vincular o parâmetro à consulta
$stmt->bind_param("i", $data['id']);

// Executar a consulta
if ($stmt->execute()) {
    echo "Aluno excluído com sucesso!";
} else {
    echo "Erro ao excluir aluno: " . $stmt->error;
}

// Fechar a declaração
$stmt->close();

// Fechar a conexão
$conn->close();
?>