// routes/PruebaRoutes.js
import express from "express";
import {
    listarPrueba,
    obtenerPrueba,
    crearPrueba,
    actualizarPrueba,
    eliminarPrueba
} from "../controllers/PruebaController.js";

const router = express.Router();

router.get("/", listarPrueba);
router.get("/:id", obtenerPrueba);
router.post("/", crearPrueba);
router.put("/:id", actualizarPrueba);
router.delete("/:id", eliminarPrueba);

export default router;
