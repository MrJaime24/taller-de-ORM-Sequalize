import fs from "fs";
import path from "path";

const paths = {
    models: "./models",
    services: "./services",
    controllersBase: "./controllers/base",
    controllers: "./controllers",
    routes: "./routes"
};

// Crear directorios necesarios
Object.values(paths).forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Filtramos modelos
const models = fs.readdirSync(paths.models)
    .filter(f => f.endsWith(".js") && f !== "init-models.js");

console.log(`🔎 Modelos encontrados: ${models.join(", ")}\n`);

for (const modelFile of models) {
    const modelName = path.basename(modelFile, ".js"); // Ej: Examen
    const modelClass = modelName.charAt(0).toUpperCase() + modelName.slice(1); 

    // Nombres de funciones para evitar colisiones
    const nameListar = `listar${modelClass}`;
    const nameObtener = `obtener${modelClass}`;
    const nameCrear = `crear${modelClass}`;
    const nameActualizar = `actualizar${modelClass}`;
    const nameEliminar = `eliminar${modelClass}`;

    // ==========================================
    // 1. SERVICIO (CORREGIDO: Ya no hace init)
    // ==========================================
    const serviceContent = `// services/${modelName}Service.js
import ${modelName} from "../models/${modelFile}";

// El modelo ya viene inicializado desde su archivo.
// Simplemente lo asignamos a una constante para usarlo.
const Model = ${modelName};

export const getAll = async () => {
    return await Model.findAll();
};

export const getById = async (id) => {
    return await Model.findByPk(id);
};

export const create = async (data) => {
    return await Model.create(data);
};

export const update = async (id, data) => {
    const item = await Model.findByPk(id);
    if (!item) return null;
    return await item.update(data);
};

export const remove = async (id) => {
    const item = await Model.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return true;
};
`;
    fs.writeFileSync(`${paths.services}/${modelName}Service.js`, serviceContent);

    // ==========================================
    // 2. CONTROLADOR BASE
    // ==========================================
    const baseControllerContent = `// controllers/base/${modelName}BaseController.js
import * as Service from "../../services/${modelName}Service.js";

export const listar = async (req, res) => {
    try {
        const data = await Service.getAll();
        res.json(data);
    } catch (e) { 
        console.error(e);
        res.status(500).json({ error: e.message }); 
    }
};

export const obtener = async (req, res) => {
    try {
        const data = await Service.getById(req.params.id);
        data ? res.json(data) : res.status(404).json({ msg: "No encontrado" });
    } catch (e) { 
        console.error(e);
        res.status(500).json({ error: e.message }); 
    }
};

export const crear = async (req, res) => {
    try {
        const data = await Service.create(req.body);
        res.status(201).json(data);
    } catch (e) { 
        console.error(e);
        res.status(500).json({ error: e.message }); 
    }
};

export const actualizar = async (req, res) => {
    try {
        const data = await Service.update(req.params.id, req.body);
        data ? res.json(data) : res.status(404).json({ msg: "No encontrado" });
    } catch (e) { 
        console.error(e);
        res.status(500).json({ error: e.message }); 
    }
};

export const eliminar = async (req, res) => {
    try {
        const exito = await Service.remove(req.params.id);
        exito ? res.json({ msg: "Eliminado" }) : res.status(404).json({ msg: "No encontrado" });
    } catch (e) { 
        console.error(e);
        res.status(500).json({ error: e.message }); 
    }
};
`;
    fs.writeFileSync(`${paths.controllersBase}/${modelName}BaseController.js`, baseControllerContent);

    // ==========================================
    // 3. CONTROLADOR PRINCIPAL
    // ==========================================
    const controllerPath = `${paths.controllers}/${modelName}Controller.js`;
    const controllerContent = `// controllers/${modelName}Controller.js
import * as Base from "./base/${modelName}BaseController.js";

export const ${nameListar} = Base.listar;
export const ${nameObtener} = Base.obtener;
export const ${nameCrear} = Base.crear;
export const ${nameActualizar} = Base.actualizar;
export const ${nameEliminar} = Base.eliminar;
`;
    fs.writeFileSync(controllerPath, controllerContent);

    // ==========================================
    // 4. RUTAS
    // ==========================================
    const routeContent = `// routes/${modelName}Routes.js
import express from "express";
import {
    ${nameListar},
    ${nameObtener},
    ${nameCrear},
    ${nameActualizar},
    ${nameEliminar}
} from "../controllers/${modelName}Controller.js";

const router = express.Router();

router.get("/", ${nameListar});
router.get("/:id", ${nameObtener});
router.post("/", ${nameCrear});
router.put("/:id", ${nameActualizar});
router.delete("/:id", ${nameEliminar});

export default router;
`;
    fs.writeFileSync(`${paths.routes}/${modelName}Routes.js`, routeContent);
    console.log(`✅ ${modelName} generado correctamente.`);
}