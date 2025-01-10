import { Router } from "express";
import { createOrder } from "./ordersController.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { insertOrderWithItemsSchema } from "../../db/ordersSchema.js";
import { verifyToken } from "../../middlewares/authenticationMiddleware.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  validateData(insertOrderWithItemsSchema),
  createOrder
);

export default router;
