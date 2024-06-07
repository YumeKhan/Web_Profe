<?php
// /backend/models/User.php
class User {
    private $pdo;

    public $id;
    public $name;
    public $email;
    public $password;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function create() {
        $stmt = $this->pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        return $stmt->execute([$this->name, $this->email, $this->password]);
    }

    public function login() {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$this->email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user && password_verify($this->password, $user['password'])) {
            return $user;
        }
        return false;
    }
}
?>
