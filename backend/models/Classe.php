<?php
// /backend/models/Classe.php
class Classe {
    private $pdo;

    public $id;
    public $name;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function create() {
        $stmt = $this->pdo->prepare("INSERT INTO classes (name) VALUES (?)");
        return $stmt->execute([$this->name]);
    }

    public function getAll() {
        $stmt = $this->pdo->prepare("SELECT * FROM classes");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getStudents($class_id) {
        $stmt = $this->pdo->prepare("SELECT * FROM students WHERE class_id = ?");
        $stmt->execute([$class_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
