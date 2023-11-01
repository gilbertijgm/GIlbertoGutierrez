import fs from 'fs';

export class CartManager {
    constructor(path){
        this.path = path;
    }

    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const cartsJSON = await fs.promises.readFile(this.path, 'utf-8')
                const cartsJs = JSON.parse(cartsJSON)
                return cartsJs
                // return JSON.parse(cartsJSON);
            } else return []

        } catch (error) {
            console.log(error);
        }
    }

    async #getMaxId() {
        let maxId = 0;
        const carts = await this.getCarts();
        carts.map((cart) => {
            if (cart.id > maxId) maxId = cart.id;;
        });
        return maxId;
    }

    async createCart() {
        try {
            const cart = {
                id: (await this.#getMaxId()) + 1,
                products: []
            }
            const cartsFile = await this.getCarts();
            cartsFile.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(id) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find(cart => cart.id === id)
            if (!cart) return false;
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(idCart, idPro){
        try {
            const carts = await this.getCarts();
            //verificamos si existe un carrito
            const cartExi = await this.getCartById(idCart);
            if(cartExi){
                const productExistCart = cartExi.products.find((p) => p.id === idPro);
                if(productExistCart) productExistCart.quantity + 1
                else {
                    const prod = {
                        product: idPro,
                        quantity: 1
                    }
                    cartExi.products.push(prod)
                }
                await fs.promises.writeFile(this.path, JSON.stringify(carts));
                console.log(product);
                return cartExi;
            }
        } catch (error) {
            console.log(error);
        }
    }
}