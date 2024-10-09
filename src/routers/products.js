import { Router } from "express";
import { ProductController } from "../controllers/products.js";
import { verifyAccessToken } from "../middlewares/verifyAccessTokens.js";
export const router = Router();
router.get("/", ProductController.getAll); // listar todos los items de una coleccion de base de datos
router.post("/", verifyAccessToken, ProductController.createOne); //crear un item
router.patch("/:id", verifyAccessToken, ProductController.updateOne); // actualizar un item
router.delete("/:id", verifyAccessToken, ProductController.deleteOne); // eliminar un item
