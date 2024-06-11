<?php
// buscar_alunos.php

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

// Consulta SQL para buscar os alunos
$sql = "SELECT * FROM alunos";
$result = $conn->query($sql);

// Armazenar os alunos em um array
$alunos = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $alunos[] = $row;
    }
}

// Fechar a conexão
$conn->close();

// Codificar o array de alunos em JSON
$json_alunos = json_encode($alunos);

// Imprimir o JSON para que possa ser capturado pelo JavaScript
echo $json_alunos;
?>