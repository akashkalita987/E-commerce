<?php
if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    // Example: add to cart logic (expand as needed)
    // $data['product_id'], $data['quantity']
    echo json_encode(['message' => 'Added to cart', 'data' => $data]);
    exit;
}
echo json_encode(['error' => 'Invalid request']);
