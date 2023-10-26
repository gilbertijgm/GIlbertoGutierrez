/*
const express = require('express');
const ProductManager = require('./ProductManager'); // Asume que está en el mismo directorio

const app = express();
const PORT = 8080;

// Iniciar la instancia de ProductManager
const productManager = new ProductManager('./src/products.json'); // Asume que tu archivo se llama 'products.json'

app.get('./src/products', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : null;
        const products = await productManager.getAllProducts();

        if (limit) {
            res.json({ products: products.slice(0, limit) });
        } else {
            res.json({ products });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const product = await productManager.getProductById(pid);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
*/

const express = require('express');
const app = express();
const ProductManager = require('./ProductManager');
const PORT = 8080;

// Inicializar ProductManager con la ruta del archivo que contiene los productos.
const productManager = new ProductManager('./src/products.json');

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await productManager.getProducts(limit);
        res.json({ products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const product = await productManager.getProductById(pid);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//http://localhost:8080/products?limit=5 para acceder a una cantidad de productos por ejemplo los primeros 5
//http://localhost:8080/products/2  para acceder a un solo producto
//http://localhost:8080/products  para ver todos los productos
