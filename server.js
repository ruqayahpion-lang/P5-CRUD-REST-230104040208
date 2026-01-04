const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // untuk membaca JSON body

let products = [
  { id: 1, name: 'Pensil 2B', price: 5000, stock: 120 },
  { id: 2, name: 'Buku Tulis', price: 12000, stock: 50 },
];

// ==================== GET all ====================
app.get('/products', (req, res) => {
  res.json({ status: 'success', data: products });
});

// ==================== GET by ID ====================
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product)
    return res.status(404).json({ status: 'error', message: 'Product not found' });

  res.json({ status: 'success', data: product });
});

// ==================== POST ====================
app.post('/products', (req, res) => {
  const { name, price, stock } = req.body;
  if (!name || price == null || stock == null)
    return res.status(400).json({ status: 'error', message: 'Invalid input' });

  const newProduct = { id: products.length + 1, name, price, stock };
  products.push(newProduct);
  res.status(201).json({
    status: 'success',
    message: 'Product created',
    data: newProduct,
  });
});

// ==================== PUT ====================
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1)
    return res.status(404).json({ status: 'error', message: 'Product not found' });

  const { name, price, stock } = req.body;
  products[index] = { id, name, price, stock };

  res.json({
    status: 'success',
    message: 'Product updated',
    data: products[index],
  });
});

// ==================== DELETE ====================
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1)
    return res.status(404).json({ status: 'error', message: 'Product not found' });

  products.splice(index, 1);
  res.json({ status: 'success', message: 'Product deleted' });
});

// ==================== RUN SERVER ====================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
