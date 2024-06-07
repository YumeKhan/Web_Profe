document.addEventListener('DOMContentLoaded', function () {
    loadClasses();
    loadStudents();
    loadAttendance();
    loadGrades();

    document.getElementById('classForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const className = document.getElementById('className').value;
        fetch('/backend/routes/classe.php?action=create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: className })
        }).then(response => response.json())
          .then(data => {
              if (data.message) {
                  alert('Classe adicionada com sucesso');
                  loadClasses();
              } else {
                  alert('Erro ao adicionar classe: ' + data.error);
              }
          });
    });

    document.getElementById('studentForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const studentName = document.getElementById('studentName').value;
        const classId = document.getElementById('classSelect').value;
        fetch('/backend/routes/student.php?action=create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: studentName, class_id: classId })
        }).then(response => response.json())
          .then(data => {
              if (data.message) {
                  alert('Aluno adicionado com sucesso');
                  loadStudents();
              } else {
                  alert('Erro ao adicionar aluno: ' + data.error);
              }
          });
    });

    document.getElementById('attendanceForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const studentId = document.getElementById('studentSelect').value;
        const date = document.getElementById('attendanceDate').value;
        const status = document.getElementById('attendanceStatus').value;
        fetch('/backend/routes/attendance.php?action=register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ student_id: studentId, date: date, status: status })
        }).then(response => response.json())
          .then(data => {
              if (data.message) {
                  alert('Presença registrada com sucesso');
                  loadAttendance();
              } else {
                  alert('Erro ao registrar presença: ' + data.error);
              }
          });
    });

    document.getElementById('gradeForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const studentId = document.getElementById('gradeStudentSelect').value;
        const subject = document.getElementById('gradeSubject').value;
        const grade = document.getElementById('gradeValue').value;
        fetch('/backend/routes/grade.php?action=register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ student_id: studentId, subject: subject, grade: grade })
        }).then(response => response.json())
          .then(data => {
              if (data.message) {
                  alert('Nota registrada com sucesso');
                  loadGrades();
              } else {
                  alert('Erro ao registrar nota: ' + data.error);
              }
          });
    });

    function loadClasses() {
        fetch('/backend/routes/classe.php')
            .then(response => response.json())
            .then(data => {
                const classesList = document.getElementById('classesList');
                classesList.innerHTML = '';
                const classSelect = document.getElementById('classSelect');
                classSelect.innerHTML = '';
                data.forEach(classItem => {
                    const div = document.createElement('div');
                    div.textContent = classItem.name;
                    classesList.appendChild(div);
                    const option = document.createElement('option');
                    option.value = classItem.id;
                    option.textContent = classItem.name;
                    classSelect.appendChild(option);
                });
            });
    }

    function loadStudents() {
        fetch('/backend/routes/student.php')
            .then(response => response.json())
            .then(data => {
                const studentsList = document.getElementById('studentsList');
                studentsList.innerHTML = '';
                const studentSelect = document.getElementById('studentSelect');
                studentSelect.innerHTML = '';
                const gradeStudentSelect = document.getElementById('gradeStudentSelect');
                gradeStudentSelect.innerHTML = '';
                data.forEach(student => {
                    const div = document.createElement('div');
                    div.classList.add('list-item');
                    div.textContent = student.name;
                    studentsList.appendChild(div);
                    const option = document.createElement('option');
                    option.value = student.id;
                    option.textContent = student.name;
                    studentSelect.appendChild(option);
                    const gradeOption = document.createElement('option');
                    gradeOption.value = student.id;
                    gradeOption.textContent = student.name;
                    gradeStudentSelect.appendChild(gradeOption);
                });
            });
    }

    function loadAttendance() {
        fetch('/backend/routes/attendance.php')
            .then(response => response.json())
            .then(data => {
                const attendanceList = document.getElementById('attendanceList');
                attendanceList.innerHTML = '';
                data.forEach(record => {
                    const div = document.createElement('div');
                    div.classList.add('list-item');
                    div.textContent = `${record.student_name} - ${record.date} - ${record.status}`;
                    attendanceList.appendChild(div);
                });
            });
    }

    function loadGrades() {
        fetch('/backend/routes/grade.php')
            .then(response => response.json())
            .then(data => {
                const gradesList = document.getElementById('gradesList');
                gradesList.innerHTML = '';
                data.forEach(record => {
                    const div = document.createElement('div');
                    div.classList.add('list-item');
                    div.textContent = `${record.student_name} - ${record.subject} - ${record.grade}`;
                    gradesList.appendChild(div);
                });
            });
    }
});
