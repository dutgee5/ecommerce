import Router from "express";
import { getProducts, getProductById, createProduct, deletedProduct, updateProduct } from "./productsController";


const router = Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/",createProduct);

router.delete("/:id", deletedProduct);

router.put("/:id", updateProduct);

export default router;
