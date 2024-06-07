<?php
require_once '../controllers/authController.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $action = $_GET['action'];

    $input = json_decode(file_get_contents('php://input'), true);
    
    if ($action == 'register') {
        echo register($input['name'], $input['email'], $input['password']);
    } elseif ($action == 'login') {
        echo login($input['email'], $input['password']);
    } elseif ($action == 'recover') {
        echo recover($input['email']);
    }
}
?>
