<?php
if ($method === 'GET') {
    $result = $conn->query('SELECT * FROM products');
    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
    echo json_encode($products);
    exit;
}
echo json_encode(['error' => 'Invalid request']);
