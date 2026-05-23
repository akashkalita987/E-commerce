<?php
if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    // Example: checkout logic (expand as needed)
    echo json_encode(['message' => 'Checkout successful', 'data' => $data]);
    exit;
}
echo json_encode(['error' => 'Invalid request']);
