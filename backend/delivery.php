<?php
// delivery.php - Handles delivery tracking requests
include_once 'db.php';
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Fetch delivery status by tracking number or order ID
    $tracking = $_GET['tracking'] ?? '';
    if (!$tracking) {
        echo json_encode(['error' => 'Tracking number required']);
        exit;
    }
    $stmt = $conn->prepare('SELECT * FROM deliveries WHERE tracking_number = ? OR order_id = ?');
    $stmt->bind_param('ss', $tracking, $tracking);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        echo json_encode(['status' => $row['status'], 'order_id' => $row['order_id'], 'tracking_number' => $row['tracking_number'], 'last_update' => $row['last_update']]);
    } else {
        echo json_encode(['error' => 'Tracking not found']);
    }
    $stmt->close();
} elseif ($method === 'POST') {
    // Update or create delivery status (admin use)
    $data = json_decode(file_get_contents('php://input'), true);
    $order_id = $data['order_id'] ?? '';
    $tracking_number = $data['tracking_number'] ?? '';
    $status = $data['status'] ?? '';
    if (!$order_id || !$tracking_number || !$status) {
        echo json_encode(['error' => 'Missing fields']);
        exit;
    }
    // Upsert logic
    $stmt = $conn->prepare('INSERT INTO deliveries (order_id, tracking_number, status, last_update) VALUES (?, ?, ?, NOW()) ON DUPLICATE KEY UPDATE status = VALUES(status), last_update = NOW()');
    $stmt->bind_param('sss', $order_id, $tracking_number, $status);
    $stmt->execute();
    if ($stmt->affected_rows > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Failed to update delivery status']);
    }
    $stmt->close();
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
$conn->close();
