import Router from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  deletedProduct,
  updateProduct,
} from "./productsController";
import { validateData } from "../..//middlewares/validationMiddleware";
import { createProductSchema, updateProductSchema } from "../../db/productsSchema";

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", validateData(createProductSchema), createProduct); // ilk parametre path, ikinci parametre middleware, üçüncü parametre controller.middleware yazma sebebi  middleware fonksiyonu çalıştıktan sonra controller fonksiyonunu çalıştırmak için

router.delete("/:id", deletedProduct);

router.put("/:id", validateData(updateProductSchema),updateProduct);

export default router;
