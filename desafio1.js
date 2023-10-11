class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.id = null; // Se establecerá en ProductManager al agregar el producto
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    constructor() {
        this.products = [];
        this.currentId = 1; // Para autoincrementar el ID del producto
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // Validar que todos los campos sean proporcionados
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios.");
            return;
        }

        // Validar que el código no se repita
        const productExists = this.products.some(product => product.code === code);
        if (productExists) {
            console.error("El código del producto ya existe.");
            return;
        }

        const product = new Product(title, description, price, thumbnail, code, stock);
        product.id = this.currentId++;
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.error("No encontrado.");
            return;
        }
        return product;
    }
}

// Ejemplo de uso:
const manager = new ProductManager();
manager.addProduct("Laptop", "lenovo", 1200, "lapto.jpg", "123a", 10);
manager.addProduct("Phone", "iphone 6", 700, "apple.jpg", "123b", 20);

console.log(manager.getProducts()); // Muestra la lista de productos

const product = manager.getProductById(1);
console.log(product); // Muestra el producto con id 1

const missingProduct = manager.getProductById(5); // Muestra "No encontrado" en la consola
