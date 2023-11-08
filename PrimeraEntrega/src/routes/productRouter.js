import { Router } from 'express';
import socketServer from "../app.js";
const router = Router();

import { ProductManager } from '../manager/productManager.js';
import { productValidator } from '../middlewares/productValidator.js';
const productManager = new ProductManager('./src/data/products.json');

//PRODUCTOS
// router.get('/', async (req, res) => {
//     try {
//         const products = await productManager.getProducts();
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json(error.message)
//     }
// });

router.get("/", async (req, res) => {
    try {
        const { limit  } = req.query;
        const products = await productManager.getProducts();
        if (!limit){
            //res.status(200).json(products);  
            res.render("products", { products });
        } 
        else{
            const productsByLimit = await productManager.getProductsByLimit(limit);
            //res.status(200).json(productsByLimit);
            res.render("products", { products });
        }
    } catch (error) {
        //res.status(500).json(error.message)
        res.status(500).send(error);
    }
})

router.get('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await productManager.getProductById(Number(id));
        if(!product){
            //res.status(404).json({message: 'product not found'})
            res.status(404).send({ error: "product not found", message: error.message})
        } 
        else{
            //res.status(200).json(product);
            res.render("products", { products: { products } });
        } 
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/', productValidator, async(req, res) => {
    try {
        const product = {...req.body };
        const productCreated = await productManager.createProduct(product);
        const { id, title, description, code, price, status, stock, category, thumbnail} = productCreated;
        const productResponse = {
            id, title, description, code, price, status, stock, category, thumbnail 
        }
        //res.status(200).json(productResponse);
        socketServer.emit("productos", await store.getProducts());
        res.status(200).send({ message: "Producto agregado con exito." });
    } catch (error) {
        //res.status(500).json(error.message)
        res.status(404).send({error: "No se pudo agregar el producto.",message: error.message,});
    }
})



router.put('/:id', async(req, res) => {
    try {
        const product = {...req.body};
        const {id} = req.params;
        const idNumber = Number(id)
        const productEncontrado = await productManager.getProductById(idNumber);
        if(!productEncontrado) res.status(404).json({message: 'product not found'})
        else await productManager.updateProduct(product, idNumber);
        res.status(200).json({message: `product id: ${id} updated`})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const idNumber = Number(id);
        await productManager.deleteProduct(idNumber)
        res.json({message: `product id: ${idNumber} deleted`})
    } catch (error) {
        res.status(500).json(error.message)
    }
})



export default router;