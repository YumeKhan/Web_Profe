<?php
// Configurações de conexão com o banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alunos_db";

// Cria conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Consulta SQL para selecionar todos os alunos
$sql = "SELECT id, nome, sobrenome FROM alunos";
$result = $conn->query($sql);

// Armazenar os resultados em um array
$alunos = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $alunos[] = $row;
    }
}

// Fechar conexão
$conn->close();

// Codificar o array como JSON
echo json_encode($alunos);
?>