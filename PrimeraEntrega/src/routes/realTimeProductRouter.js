import { Router } from "express";
import { ProductManager } from "../manager/productManager.js";
const router = Router();
const store = new ProductManager();

router.get("/", async (req, res) => {
  const products = await store.getProducts();

  res.render("realTimeProducts");
});

export default router;
