# products-api-

A simple Node.js + Express API to simulate product data using a local `products.json` file. Supports GET and POST requests to fetch, filter, and add products.

## 🌐 Live Demo

**Base URL:**  
🔗 [`https://products-api-lemon.vercel.app`](https://products-api-lemon.vercel.app)

---

## 📂 Project Structure

```
products-api/
├── api/ (for vercel)
│   └── index.js         # Express server logic
├── products.json        # Local JSON data
├── package.json
```

> Note: On local setup, your `server.js` should be at root. On Vercel, your code should go in `api/index.js`.

---

## 🚀 API Endpoints

### ✅ GET `/products`

Returns all products.

**Example:**  
[`/products`](https://products-api-lemon.vercel.app/products)

---

### ✅ GET `/products?category=electronics`

Filters products by `category`.

**Example:**  
[`/products?category=electronics`](https://products-api-lemon.vercel.app/products?category=electronics)

---

### ✅ GET `/products/:id`

Get a specific product by ID.

**Example:**  
[`/products/101`](https://products-api-lemon.vercel.app/products/101)

**404 Response:**
```json
{ "message": "Product not found" }
```

---

### ✅ POST `/products`

Adds a new product.

**Request Headers:**  
`Content-Type: application/json`

**Request Body:**
```json
{
  "id": "106",
  "name": "Wireless Mouse",
  "price": 799,
  "category": "electronics",
  "inStock": true
}
```

**Success Response:**
```json
{
  "message": "Product added successfully",
  "product": {
    "id": "106",
    "name": "Wireless Mouse",
    "price": 799,
    "category": "electronics",
    "inStock": true
  }
}
```

**Error Responses:**
- Missing fields:  
```json
{ "message": "Invalid product data" }
```

- Duplicate ID:  
```json
{ "message": "Product with this ID already exists" }
```

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- JSON File System
- Vercel (for serverless deployment)

---

## 🧭 Running Locally

```bash
git clone https://github.com/yourusername/products-api.git
cd products-api
npm install
node server.js
```

Server will start on: `http://localhost:3000`

---

## ☁️ Deployment (Vercel)

1. Create a GitHub repo with this structure.
2. Move your `server.js` to `api/index.js`.
3. Push to GitHub and connect with [Vercel](https://vercel.com).
4. Done! It auto-hosts under `/api`.

---

## 👨‍💻 Author

Made by **Ravi Singh**  
🔗 Live API: [https://products-api-lemon.vercel.app](https://products-api-lemon.vercel.app)
