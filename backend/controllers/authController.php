<?php
require_once '../db/db.php';
require_once '../models/User.php';
require_once '../utils/mailer.php';

function register($name, $email, $password) {
    global $pdo;
    $user = new User($pdo);

    $user->name = $name;
    $user->email = $email;
    $user->password = password_hash($password, PASSWORD_BCRYPT);

    if ($user->create()) {
        sendMail($email, 'Account Created', 'Your account has been created successfully!');
        return json_encode(['message' => 'User created']);
    } else {
        return json_encode(['error' => 'Unable to create user']);
    }
}

function login($email, $password) {
    global $pdo;
    $user = new User($pdo);

    $user->email = $email;
    $user->password = $password;

    if ($data = $user->login()) {
        sendMail($email, 'Login Notification', 'You have successfully logged in!');
        return json_encode(['message' => 'Login successful', 'user' => $data]);
    } else {
        return json_encode(['error' => 'Invalid credentials']);
    }
}

function recover($email) {
    // Implement password recovery logic
    sendMail($email, 'Password Recovery', 'Password recovery instructions');
    return json_encode(['message' => 'Recovery email sent']);
}
?>
