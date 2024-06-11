// Evento para enviar os dados de matrícula do aluno
document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const headerButtons = document.querySelector('.header-buttons');

    menuIcon.addEventListener('click', function () {
        headerButtons.classList.toggle('show');
    });

    // Adiciona evento ao botão de logout para redirecionar para index.html
    const logoutButton = document.querySelector('.logout-button');
    logoutButton.addEventListener('click', function () {
        window.location.href = 'login.html';
    });

    // Adiciona evento ao botão de professores para redirecionar para cadastro de professores
    const profButton = document.querySelector('.proprof-button');
    profButton.addEventListener('click', function () {
        window.location.href = 'cadastro de professores.html';
    });

    // Adiciona evento ao botão de inserir alunos para redirecionar para inserir alunos.html
    const inserirButton = document.querySelector('.proinserir-button');
    inserirButton.addEventListener('click', function () {
        window.location.href = 'inserir alunos.html';
    });

    // Adiciona evento ao botão de classes para redirecionar para classes.html
    const classesButton = document.querySelector('.proclasses-button');
    classesButton.addEventListener('click', function () {
        window.location.href = 'classes.html';
    });

    // Adiciona evento ao botão de matrícula de alunos para redirecionar para matricula de alunos.html
    const matriButton = document.querySelector('.promatri-button');
    matriButton.addEventListener('click', function () {
        window.location.href = 'matricula de alunos.html';
    });

    // Evento para adicionar um novo aluno
    const addStudentButton = document.querySelector('.add-student-button');
    addStudentButton.addEventListener('click', function () {
        window.location.href = 'cadastro_alunos.php';
    });

        // Adiciona evento aos botões de atualizar
        const updateButtons = document.querySelectorAll('.atualizar-button');
        updateButtons.forEach(button => {
            button.addEventListener('click', function () {
                const row = button.parentNode.parentNode;
                const inputs = row.querySelectorAll('input');
                const data = {
                    nome: inputs[0].value,
                    sobrenome: inputs[1].value,
                    disciplina: inputs[2].value,
                    nascimento: inputs[3].value,
                    email: inputs[4].value,
                    telefone: inputs[5].value
                };
                console.log('Dados atualizados:', data);

                // Envia a atualização para o backend usando fetch
                fetch('backend/scripts/atualizar_professor.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.text())
                .then(responseText => {
                    alert(responseText);
                })
                .catch(error => {
                    console.error('Erro ao atualizar dados:', error);
                    alert('Erro ao atualizar dados');
                });
            });
        });
    });

