// routes/productosRoutes.js
import express from "express";
import {
    listarProductos,
    obtenerProductos,
    crearProductos,
    actualizarProductos,
    eliminarProductos
} from "../controllers/productosController.js";

const router = express.Router();

router.get("/", listarProductos);
router.get("/:id", obtenerProductos);
router.post("/", crearProductos);
router.put("/:id", actualizarProductos);
router.delete("/:id", eliminarProductos);

export default router;
