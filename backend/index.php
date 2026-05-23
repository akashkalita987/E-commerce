<?php
// Entry point for the backend API
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$endpoint = $_GET['endpoint'] ?? '';

require_once 'db.php';

switch ($endpoint) {
    case 'products':
        require_once 'products.php';
        break;
    case 'cart':
        require_once 'cart.php';
        break;
    case 'checkout':
        require_once 'checkout.php';
        break;
    default:
        echo json_encode(['error' => 'Invalid endpoint']);
        break;
}
