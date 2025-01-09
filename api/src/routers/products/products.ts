import Router from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  deletedProduct,
  updateProduct,
} from "./productsController.js";
import { validateData } from "../..//middlewares/validationMiddleware.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../../db/productsSchema.js";
import {
  verifySeller,
  verifyToken,
} from "../../middlewares/authenticationMiddleware.js";

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post(
  "/",
  verifyToken,
  verifySeller,
  validateData(createProductSchema),
  createProduct
); /* ilk parametre path, (verifyToken middleware'ini kullanarak token'ı kontrol ediyoruz. Eğer token yoksa ürün eklenemez.
) ikinci parametre middleware, üçüncü parametre controller.middleware yazma sebebi  middleware fonksiyonu çalıştıktan sonra controller fonksiyonunu çalıştırmak için*/

router.delete("/:id", verifyToken, verifySeller, deletedProduct);

router.put(
  "/:id",
  verifyToken,
  verifySeller,
  validateData(updateProductSchema),
  updateProduct
);

export default router;
