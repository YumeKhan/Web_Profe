<?php
include '../config/db.php';

$action = $_GET['action'] ?? '';

if ($action == 'register') {
    $data = json_decode(file_get_contents('php://input'), true);
    $student_id = $data['student_id'];
    $subject = $data['subject'];
    $grade = $data['grade'];
    $query = "INSERT INTO grades (student_id, subject, grade) VALUES ('$student_id', '$subject', '$grade')";
    if (mysqli_query($conn, $query)) {
        echo json_encode(['message' => 'Nota registrada com sucesso']);
    } else {
        echo json_encode(['error' => mysqli_error($conn)]);
    }
} else {
    $query = "SELECT grades.*, students.name AS student_name FROM grades JOIN students ON grades.student_id = students.id";
    $result = mysqli_query($conn, $query);
    $records = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $records[] = $row;
    }
    echo json_encode($records);
}
?>
