/*
const fs = require('fs').promises;

class ProductManager {
    constructor(filename) {
        this.filename = filename;
    }

    async getAllProducts() {
        const data = await fs.readFile(this.filename, 'utf-8');
        return JSON.parse(data);
    }

    async getProductById(pid) {
        const products = await this.getAllProducts();
        return products.find(product => product.id === pid);
    }
}

module.exports = ProductManager;
*/

const fs = require('fs').promises;

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async getProducts(limit) {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            const products = JSON.parse(data);
            if (limit && products.length > limit) {
                return products.slice(0, limit);
            }
            return products;
        } catch (error) {
            throw new Error('Error al leer los productos.');
        }
    }

    async getProductById(pid) {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            const products = JSON.parse(data);
            return products.find(product => product.id === pid);
        } catch (error) {
            throw new Error('Error al leer el producto.');
        }
    }
}

module.exports = ProductManager;
