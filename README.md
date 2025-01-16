
# Node.js Product Catalog

## Overview
This is a Node.js application that serves a product catalog. It includes:
- An overview page displaying all products.
- Individual product pages showing detailed information.
- A simple API endpoint for fetching product data in JSON format.

## Features
- Dynamic content rendering using templates.
- Simple HTTP server using built-in Node.js modules.
- A product catalog loaded from a local JSON file.

## How to Run
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/repository-name.git
   ```
2. Navigate to the project folder:
   ```bash
   cd repository-name
   ```
3. Run the server:
   ```bash
   node app.js
   ```
4. Open the browser and go to `http://127.0.0.1:8000/` to view the catalog.

## API Endpoints
- `GET /api`: Returns all product data in JSON format.
- `GET /product?id=<id>`: Shows details for a specific product.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
