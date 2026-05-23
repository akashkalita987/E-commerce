# E-Commerce Backend (PHP + MySQL)

## Setup
1. Create a MySQL database named `ecommerce`.
2. Create a `products` table (example schema below).
3. Update `db.php` with your MySQL credentials if needed.
4. Place the `backend` folder on your PHP server (e.g., XAMPP/htdocs).

## Example `products` Table
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(255)
);
```

## API Endpoints
- `/backend/index.php?endpoint=products` (GET): List all products
- `/backend/index.php?endpoint=cart` (POST): Add to cart (expand logic as needed)
- `/backend/index.php?endpoint=checkout` (POST): Checkout (expand logic as needed)

## Notes
- This is a basic backend template. Expand logic for cart and checkout as needed.
- Secure and validate all inputs before using in production.
