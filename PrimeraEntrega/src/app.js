import express from 'express';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import realtimeproducts from './routes/realTimeProductRouter.js';
import { ProductManager } from "./manager/productManager.js";

import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`server ok en el puerto ${PORT}`)
});

const socketServer = new Server(httpServer);
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutass
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use("/realtimeproducts", realtimeproducts);

const store = new ProductManager();

socketServer.on("connection", async (socket) => {
    console.log("Nuevo Cliente conectado");
    const productos = await store.getProducts();
    socket.emit("products", productos);
});



export default socketServer;