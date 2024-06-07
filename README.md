# Sistema de Gerenciamento para Professores
Este projeto é um sistema completo de gerenciamento escolar para professores, desenvolvido utilizando HTML, CSS, JavaScript, PHP e MySQL. O sistema permite que os professores realizem diversas operações como login, cadastro, recuperação de senha, gerenciamento de turmas e alunos, registro de presenças e faltas, adição de notas e upload de materiais de estudo.

# Funcionalidades Principais

Autenticação de Usuários: Sistema de login, cadastro e recuperação de senha com notificações por email.
Gerenciamento de Turmas: Consulta e visualização de turmas.
Gerenciamento de Alunos: Registro e visualização de presenças, faltas e notas de alunos.
Upload de Materiais de Estudo: Upload de arquivos para cada aluno.
Notificações por Email: Envio de notificações automáticas para o email dos professores ao criar conta, recuperar senha e fazer login.

# Estrutura do Projeto

backend/: Contém os scripts PHP para gerenciamento do banco de dados e controle de lógica de negócio.
db/: Conexão com o banco de dados.
controllers/: Controladores para gerenciamento de autenticação, turmas e alunos.
models/: Modelos que representam as tabelas do banco de dados.
routes/: Rotas de API para interagir com o frontend.
utils/: Utilitários, incluindo o envio de emails.
frontend/: Contém os arquivos HTML, CSS e JavaScript para a interface do usuário.
css/: Estilos CSS.
js/: Scripts JavaScript.
pages/: Páginas HTML para login, cadastro, gerenciamento de turmas e alunos.
