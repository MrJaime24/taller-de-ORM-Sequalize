// routes/ExamenRoutes.js
import express from "express";
import {
    listarExamen,
    obtenerExamen,
    crearExamen,
    actualizarExamen,
    eliminarExamen
} from "../controllers/ExamenController.js";

const router = express.Router();

router.get("/", listarExamen);
router.get("/:id", obtenerExamen);
router.post("/", crearExamen);
router.put("/:id", actualizarExamen);
router.delete("/:id", eliminarExamen);

export default router;
