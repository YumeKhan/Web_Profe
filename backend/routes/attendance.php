<?php
include '../config/db.php';

$action = $_GET['action'] ?? '';

if ($action == 'register') {
    $data = json_decode(file_get_contents('php://input'), true);
    $student_id = $data['student_id'];
    $date = $data['date'];
    $status = $data['status'];
    $query = "INSERT INTO attendance (student_id, date, status) VALUES ('$student_id', '$date', '$status')";
    if (mysqli_query($conn, $query)) {
        echo json_encode(['message' => 'Presença registrada com sucesso']);
    } else {
        echo json_encode(['error' => mysqli_error($conn)]);
    }
} else {
    $query = "SELECT attendance.*, students.name AS student_name FROM attendance JOIN students ON attendance.student_id = students.id";
    $result = mysqli_query($conn, $query);
    $records = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $records[] = $row;
    }
    echo json_encode($records);
}
?>
