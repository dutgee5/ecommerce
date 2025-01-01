import Router from "express";
import { getProducts, getProductById, createProduct, deleteProduct, updateProduct } from "./productsController";


const router = Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/",createProduct);

router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct);

export default router;
