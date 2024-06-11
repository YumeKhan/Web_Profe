<?php
// buscar_alunos_notas_faltas.php

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

// Consulta SQL para buscar os alunos, notas e faltas
$sql = "SELECT alunos.nome, alunos.sobrenome, notas.bimestre1, notas.bimestre2, notas.bimestre3, notas.bimestre4, faltas.bimestre1 AS faltas1, faltas.bimestre2 AS faltas2, faltas.bimestre3 AS faltas3, faltas.bimestre4 AS faltas4
FROM alunos
JOIN notas ON alunos.id = notas.aluno_id
JOIN faltas ON alunos.id = faltas.aluno_id";
$result = $conn->query($sql);

// Armazenar os alunos, notas e faltas em um array
$dados = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $dados[] = $row;
    }
}

// Fechar a conexão
$conn->close();

// Codificar o array de dados em JSON
$json_dados = json_encode($dados);

// Imprimir o JSON para que possa ser capturado pelo JavaScript
echo $json_dados;
?>