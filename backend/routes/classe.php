<?php
// /backend/routes/classe.php
require_once '../db/db.php';
require_once '../models/Classe.php';

function createClass($name) {
    global $pdo;
    $classe = new Classe($pdo);
    $classe->name = $name;

    if ($classe->create()) {
        return json_encode(['message' => 'Class created']);
    } else {
        return json_encode(['error' => 'Unable to create class']);
    }
}

function getAllClasses() {
    global $pdo;
    $classe = new Classe($pdo);
    return json_encode($classe->getAll());
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $action = $_GET['action'];
    $input = json_decode(file_get_contents('php://input'), true);

    if ($action == 'create') {
        echo createClass($input['name']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
    echo getAllClasses();
}

include '../config/db.php';

$action = $_GET['action'] ?? '';

if ($action == 'create') {
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'];
    $query = "INSERT INTO classes (name) VALUES ('$name')";
    if (mysqli_query($conn, $query)) {
        echo json_encode(['message' => 'Classe criada com sucesso']);
    } else {
        echo json_encode(['error' => mysqli_error($conn)]);
    }
} else {
    $query = "SELECT * FROM classes";
    $result = mysqli_query($conn, $query);
    $classes = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $classes[] = $row;
    }
    echo json_encode($classes);
}
?>

