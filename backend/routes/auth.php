<?php
// /backend/routes/auth.php
require_once '../db/db.php';
require_once '../models/User.php';

function login($email, $password) {
    global $pdo;
    $user = new User($pdo);
    $user->email = $email;
    $user->password = $password;

    if ($data = $user->login()) {
        return json_encode(['message' => 'Login successful', 'user' => $data]);
    } else {
        return json_encode(['error' => 'Invalid credentials']);
    }
}

function register($name, $email, $password) {
    global $pdo;
    $user = new User($pdo);
    $user->name = $name;
    $user->email = $email;
    $user->password = password_hash($password, PASSWORD_BCRYPT);

    if ($user->create()) {
        return json_encode(['message' => 'User created']);
    } else {
        return json_encode(['error' => 'Unable to create user']);
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $action = $_GET['action'];
    $input = json_decode(file_get_contents('php://input'), true);

    if ($action == 'login') {
        echo login($input['email'], $input['password']);
    } elseif ($action == 'register') {
        echo register($input['name'], $input['email'], $input['password']);
    }
}
?>
