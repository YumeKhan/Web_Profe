<?php
include '../config/db.php';

$action = $_GET['action'] ?? '';

if ($action == 'create') {
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'];
    $class_id = $data['class_id'];
    $query = "INSERT INTO students (name, class_id) VALUES ('$name', '$class_id')";
    if (mysqli_query($conn, $query)) {
        echo json_encode(['message' => 'Aluno adicionado com sucesso']);
    } else {
        echo json_encode(['error' => mysqli_error($conn)]);
    }
} else {
    $query = "SELECT students.*, classes.name AS class_name FROM students JOIN classes ON students.class_id = classes.id";
    $result = mysqli_query($conn, $query);
    $students = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $students[] = $row;
    }
    echo json_encode($students);
}
?>
