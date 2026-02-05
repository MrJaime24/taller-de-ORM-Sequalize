// routes/LogRoutes.js
import express from "express";
import {
    listarLog,
    obtenerLog,
    crearLog,
    actualizarLog,
    eliminarLog
} from "../controllers/LogController.js";

const router = express.Router();

router.get("/", listarLog);
router.get("/:id", obtenerLog);
router.post("/", crearLog);
router.put("/:id", actualizarLog);
router.delete("/:id", eliminarLog);

export default router;
