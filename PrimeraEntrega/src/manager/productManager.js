import fs from 'fs';

export class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const productsJSON = await fs.promises.readFile(this.path, 'utf-8')
                const productsJs = JSON.parse(productsJSON)
                return productsJs
            } else return []

        } catch (error) {
            console.log(error);
        }
    }

    async #getMaxId() {
        let maxId = 0;
        const products = await this.getProducts();
        products.map((product) => {
            if (product.id > maxId) maxId = product.id;;
        });
        return maxId;
    }

    async createProduct(obj) {
        try {
            const product = {
                id: await this.#getMaxId() + 1,
                status: true, //el estatus viene por defecto
                ...obj
            }
            const products = await this.getProducts()
           
            products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const product = products.find(product => product.id === id)
            if (!product) return false;
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductsByLimit(limit){
        try {
            const products = await this.getProducts();
            if(!limit || limit >= products.length) return products;
            else return products.slice(0, limit);
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(obj, id) {
        try {
            const products = await this.getProducts(); //aca llamo el array de producto
            const index = products.findIndex(product => product.id === id); //aca buscamos por el id que llega por parametro, si lo encuenta me devuelve el indice(posicion)
            if (index === -1) return false // si no lo encuentra me devuelve -1
            else products[index] = { ...obj, id } //si lo encuetra me devuelve el objeto
            await fs.promises.writeFile(this.path, JSON.stringify(products))
        } catch (error) {
            console.log(error);
        }
    }
    
    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            if (products.length < 0) return false;
            const newArray = products.filter(product => product.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(newArray))
        } catch (error) {
            console.log(error);
        }
    }
}