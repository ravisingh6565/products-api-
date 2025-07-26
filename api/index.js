const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

const PRODUCTS_FILE = path.join(__dirname, '..', 'products.json');


/**
 * Utility function to read product data from JSON file
 */
const readProducts = () => {
  try {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to read products:', error);
    return [];
  }
};

/**
 * Utility function to write product data to JSON file
 */
const writeProducts = (products) => {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
  } catch (error) {
    console.error('Failed to write products:', error);
  }
};

/**
 * GET /products - Retrieve all products or filter by category
 */
app.get('/products', (req, res) => {
  const { category } = req.query;
  let products = readProducts();

  if (category) {
    products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  res.status(200).json(products);
});

/**
 * GET /products/:id - Retrieve a product by ID
 */
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const products = readProducts();
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(product);
});

/**
 * POST /products - Add a new product
 */
app.post('/products', (req, res) => {
  const { id, name, price, category, inStock } = req.body;

  if (!id || !name || !price || !category || typeof inStock !== 'boolean') {
    return res.status(400).json({ message: 'Invalid product data' });
  }

  const products = readProducts();

  if (products.some(p => p.id === id)) {
    return res.status(409).json({ message: 'Product with this ID already exists' });
  }

  const newProduct = { id, name, price, category, inStock };
  products.push(newProduct);
  writeProducts(products);

  res.status(201).json({ message: 'Product added successfully', product: newProduct });
});

// Required for Vercel compatibility
module.exports = app;

// Only listen when not running in Vercel
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}
