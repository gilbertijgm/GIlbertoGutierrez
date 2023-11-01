import { Router } from 'express';
const router = Router();

import { CartManager } from "../manager/cartManager.js";
const cartManager = new CartManager('./src/data/carts.json');
import { ProductManager } from '../manager/productManager.js';
const productManager = new ProductManager('./src/data/products.json');


router.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getCarts();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error.message)
    }
});

router.get('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const cart = await cartManager.getCartById(Number(id));
        if(!cart) res.status(404).json({message: 'cart not found'})
        else res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/', async(req, res) => {
    try {
        const cartCreated = await cartManager.createCart(req.body);
        res.status(200).json(cartCreated);
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/:idCart/product/:idPro', async(req, res) =>{
    
    try {
        
        const { idCart } = req.params;
        const cart = await cartManager.getCartById(idCart);
        const { idPro } = req.params;
        const product = await productManager.getProductById(idPro);

        const addProduct = await cartManager.addProductToCart(cart, product);
        console.log(addProduct);
        res.status(200).send(addProduct);
    } catch (error) {
        res.status(500).json(error.message)
    }
    
})


export default router;