const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }

  _getNextId() {
    const products = this.getProducts();
    if (products.length === 0) {
      return 1;
    }
    const lastProduct = products[products.length - 1];
    return lastProduct.id + 1;
  }

  addProduct(product) {
    const products = this.getProducts();
    const newProduct = {
      id: this._getNextId(),
      ...product
    };
    products.push(newProduct);
    fs.writeFileSync(this.path, JSON.stringify(products));
    return newProduct;
  }

  getProducts() {
    const data = fs.readFileSync(this.path, 'utf-8');
    return JSON.parse(data);
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find(product => product.id === id);
  }

  updateProduct(id, updatedProduct) {
    const products = this.getProducts();
    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }

    products[productIndex] = {
      ...products[productIndex],
      ...updatedProduct,
      id  // Para que el id no sufra cambios para actualizar
    };

    fs.writeFileSync(this.path, JSON.stringify(products));
    return products[productIndex];
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const filteredProducts = products.filter(product => product.id !== id);

    if (products.length === filteredProducts.length) {
      throw new Error('Producto no encontrado');
    }

    fs.writeFileSync(this.path, JSON.stringify(filteredProducts));
  }
}

// Ejemplo de uso:
// para crear el producto
const manager = new ProductManager('products.json');
manager.addProduct({
  title: "lenovo",
  description: "lenovo thinpkpad",
  price: 253.000,
  thumbnail: "lenovo.jpg",
  code: "123ABC",
  stock: 10
});

console.log(manager.getProducts());
console.log(manager.getProductById(1));

//para modiciar el producto
manager.updateProduct(1, { title: "Lapto" });
console.log(manager.getProductById(1));

//para eliminar el producto
manager.deleteProduct(1);
console.log(manager.getProducts());
