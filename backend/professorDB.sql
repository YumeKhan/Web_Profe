CREATE DATABASE professorDB;

USE professorDB;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    classId INT,
    FOREIGN KEY (classId) REFERENCES Classes(id)
);

CREATE TABLE Notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value DECIMAL(5,2) NOT NULL,
    studentId INT,
    FOREIGN KEY (studentId) REFERENCES Students(id)
);

CREATE TABLE Attendances (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    status BOOLEAN NOT NULL,
    studentId INT,
    FOREIGN KEY (studentId) REFERENCES Students(id)
);

CREATE TABLE Materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    studentId INT,
    FOREIGN KEY (studentId) REFERENCES Students(id)
);

CREATE TABLE Notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT NOT NULL,
    classId INT,
    FOREIGN KEY (classId) REFERENCES Classes(id)
);
