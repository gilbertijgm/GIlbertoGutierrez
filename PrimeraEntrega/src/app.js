import express from 'express';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';

import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";

const app = express();

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

socketServer.on("connection", async (socket) => {
    console.log("Nuevo Cliente conectado");
    const productos = await store.getProducts();
    socket.emit("productos", productos);
  });

const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`server ok en el puerto ${PORT}`)
});

