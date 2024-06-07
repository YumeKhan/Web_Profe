<?php
class User {
    private $conn;
    private $table_name = "Users";

    public $id;
    public $name;
    public $email;
    public $password;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET name=:name, email=:email, password=:password";
        $stmt = $this->conn->prepare($query);
        
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->password=htmlspecialchars(strip_tags($this->password));

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function login() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE email=:email";
        $stmt = $this->conn->prepare($query);
        
        $this->email=htmlspecialchars(strip_tags($this->email));
        
        $stmt->bindParam(":email", $this->email);

        $stmt->execute();
        
        if ($stmt->rowCount() == 1) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if (password_verify($this->password, $row['password'])) {
                return $row;
            }
        }
        return false;
    }
}
?>
