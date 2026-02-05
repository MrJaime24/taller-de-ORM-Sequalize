import express from 'express';
import fs from 'fs';
import path from 'path';
import { sequelize } from './config/db.js'; // Asegúrate de que esta ruta es correcta
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para entender JSON
app.use(express.json());

// -------------------------------------------------------------
// 🔄 CARGA AUTOMÁTICA DE RUTAS (Magia para el examen)
// -------------------------------------------------------------
// Esto lee la carpeta 'routes' y carga cada archivo automáticamente.
// Así NO tienes que escribir "import pruebaRoutes..." manualmente.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const routesPath = path.join(__dirname, 'routes');

// Verificamos si existe la carpeta routes
if (fs.existsSync(routesPath)) {
    const routeFiles = fs.readdirSync(routesPath).filter(file => file.endsWith('.js'));

    console.log('\n🚦 Cargando rutas...');
    
    for (const file of routeFiles) {
        // Importación dinámica del archivo de ruta
        const routeModule = await import(`./routes/${file}`);
        
        // Extraemos el nombre para la URL (ej: PruebaRoutes.js -> /api/pruebas)
        // Quitamos "Routes.js" y lo ponemos en minúsculas
        const routeName = file.replace('Routes.js', '').toLowerCase();
        
        // Montamos la ruta
        app.use(`/api/${routeName}`, routeModule.default);
        console.log(`   mapped: /api/${routeName} --> routes/${file}`);
    }
} else {
    console.error("❌ Error: No se encuentra la carpeta 'routes'. Ejecuta primero el autocrud.js");
}

// -------------------------------------------------------------
// 🏁 ARRANQUE DEL SERVIDOR
// -------------------------------------------------------------
const startServer = async () => {
    try {
        // Sincronizar base de datos (crea la tabla 'pruebas' si no existe)
        await sequelize.sync({ force: false }); 
        console.log('\n✅ Base de datos sincronizada');

        app.listen(PORT, () => {
            console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
            console.log(`🧪 Prueba tu modelo en: http://localhost:${PORT}/api/prueba`);
        });
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error);
    }
};

startServer();