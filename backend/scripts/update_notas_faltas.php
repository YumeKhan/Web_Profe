<?php
// backend/scripts/update_notas_faltas.php
require_once 'backend/config/db.php';

$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    foreach ($data['notas'] as $nota) {
        $stmt = $pdo->prepare('UPDATE notas SET bimestre1 = ?, bimestre2 = ?, bimestre3 = ?, bimestre4 = ? WHERE aluno_id = ?');
        $stmt->execute([$nota['bimestre1'], $nota['bimestre2'], $nota['bimestre3'], $nota['bimestre4'], $nota['aluno_id']]);
    }

    foreach ($data['faltas'] as $falta) {
        $stmt = $pdo->prepare('UPDATE faltas SET bimestre1 = ?, bimestre2 = ?, bimestre3 = ?, bimestre4 = ? WHERE aluno_id = ?');
        $stmt->execute([$falta['bimestre1'], $falta['bimestre2'], $falta['bimestre3'], $falta['bimestre4'], $falta['aluno_id']]);
    }

    echo json_encode(['status' => 'success']);
}
?>
