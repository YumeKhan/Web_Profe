<?php
// salvar_notas_faltas.php

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

// Ler os dados enviados pelo JavaScript
$data = json_decode(file_get_contents('php://input'), true);
$notas = $data['notas'] ?? [];
$faltas = $data['faltas'] ?? [];

// Função para salvar as notas no banco de dados
function salvarNotas($conn, $notas) {
    $sql = "INSERT INTO notas (aluno_id, bimestre1, bimestre2, bimestre3, bimestre4) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE bimestre1 = VALUES(bimestre1), bimestre2 = VALUES(bimestre2), bimestre3 = VALUES(bimestre3), bimestre4 = VALUES(bimestre4)";
    $stmt = $conn->prepare($sql);

    foreach ($notas as $nota) {
        $stmt->bind_param('iiiii', $nota['aluno_id'], $nota['bimestre1'], $nota['bimestre2'], $nota['bimestre3'], $nota['bimestre4']);
        $stmt->execute();
    }

    $stmt->close();
}

// Função para salvar as faltas no banco de dados
function salvarFaltas($conn, $faltas) {
    $sql = "INSERT INTO faltas (aluno_id, bimestre1, bimestre2, bimestre3, bimestre4) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE bimestre1 = VALUES(bimestre1), bimestre2 = VALUES(bimestre2), bimestre3 = VALUES(bimestre3), bimestre4 = VALUES(bimestre4)";
    $stmt = $conn->prepare($sql);

    foreach ($faltas as $falta) {
        $stmt->bind_param('iiiii', $falta['aluno_id'], $falta['bimestre1'], $falta['bimestre2'], $falta['bimestre3'], $falta['bimestre4']);
        $stmt->execute();
    }

    $stmt->close();
}

// Salvar as notas e faltas
salvarNotas($conn, $notas);
salvarFaltas($conn, $faltas);

// Fechar a conexão
$conn->close();

// Retornar uma mensagem de sucesso
echo json_encode(['message' => 'Notas e faltas salvas com sucesso!']);
?>