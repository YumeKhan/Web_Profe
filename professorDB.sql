CREATE DATABASE alunos_db;

USE alunos_db;

CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    data_nascimento DATE,
    CONSTRAINT chk_telefone CHECK (telefone REGEXP '^[0-9]{10,20}$')
);

CREATE TABLE notas (
    aluno_id INT,
    bimestre1 FLOAT CHECK (bimestre1 BETWEEN 0 AND 10),
    bimestre2 FLOAT CHECK (bimestre2 BETWEEN 0 AND 10),
    bimestre3 FLOAT CHECK (bimestre3 BETWEEN 0 AND 10),
    bimestre4 FLOAT CHECK (bimestre4 BETWEEN 0 AND 10),
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    PRIMARY KEY (aluno_id)
);

CREATE TABLE faltas (
    aluno_id INT,
    bimestre1 INT CHECK (bimestre1 >= 0),
    bimestre2 INT CHECK (bimestre2 >= 0),
    bimestre3 INT CHECK (bimestre3 >= 0),
    bimestre4 INT CHECK (bimestre4 >= 0),
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    PRIMARY KEY (aluno_id)
);
