<?php
// inserir_aluno.php

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

// Preparar a consulta SQL
$stmt = $conn->prepare("INSERT INTO alunos (nome, sobrenome, email, senha, telefone, data_nascimento) VALUES (?, ?, ?, ?, ?, ?)");

// Vincular os parâmetros à consulta
$stmt->bind_param("ssssss", $data['nome'], $data['sobrenome'], $data['email'], $data['senha'], $data['telefone'], $data['dataNascimento']);

// Executar a consulta
if ($stmt->execute()) {
    echo "Aluno cadastrado com sucesso!";
} else {
    echo "Erro ao cadastrar aluno: " . $stmt->error;
}

// Fechar a declaração
$stmt->close();

// Fechar a conexão
$conn->close();
?>