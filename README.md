# ApiRest Node ORM Sequelize

Este proyecto es una **API RESTful** robusta desarrollada con **Node.js**, **Express** y **Sequelize ORM** para interactuar con bases de datos **MySQL**. 

Está diseñado para servir como base escalable para aplicaciones backend, incluyendo características avanzadas como la generación automática de CRUDs y una arquitectura modular basada en el patrón Modelo-Servicio-Controlador.

## 🚀 Características Principales

*   **Arquitectura en Capas**: Separación clara de responsabilidades:
    *   **Modelos**: Definición de esquemas de datos con Sequelize.
    *   **Servicios**: Lógica de negocio y acceso a datos.
    *   **Controladores**: Manejo de peticiones y respuestas HTTP.
    *   **Rutas**: Definición de endpoints.
*   **Auto CRUD Generator**: Script `autocrud.js` que detecta nuevos modelos y genera automáticamente los servicios, controladores y rutas necesarios.
*   **Carga Dinámica de Rutas**: `server.js` importa y monta automáticamente las rutas definidas en la carpeta `routes/`.
*   **Sequelize ORM**: Gestión de base de datos relacional moderna con soporte para migraciones y sincronización.
*   **Middleware**: Configuración lista para procesar JSON.

## 🛠️ Tecnologías Utilizadas

*   [Node.js](https://nodejs.org/) - Entorno de ejecución.
*   [Express](https://expressjs.com/) - Framework web.
*   [Sequelize](https://sequelize.org/) - ORM para Node.js.
*   [MySQL2](https://github.com/sidorares/node-mysql2) - Cliente de base de datos.
*   [Nodemon](https://nodemon.io/) - Utilidad para desarrollo (reinicio automático).

## 📋 Requisitos Previos

Asegúrate de tener instalado:
*   [Node.js](https://nodejs.org/) (versión 14 o superior recomendada)
*   [MySQL](https://www.mysql.com/)

## ⚙️ Instalación y Configuración

1.  **Clonar el repositorio**
    ```bash
    git clone https://github.com/MrJaime24/taller-de-ORM-Sequalize
    cd taller-de-ORM-Sequalize
    ```

2.  **Instalar dependencias**
    ```bash
    npm install
    ```

3.  **Configurar Base de Datos**
    Edita el archivo `config/db.js` con tus credenciales locales de MySQL:
    ```javascript
    export const sequelize = new Sequelize("nombre_base_datos", "usuario", "contraseña", {
      host: "localhost",
      dialect: "mysql",
      logging: false // Cambiar a true para ver SQL en consola
    });
    ```
    *Asegúrate de crear la base de datos en MySQL antes de ejecutar el servidor, o permite que Sequelize la sincronice si está configurado.*

## ▶️ Ejecución

### Modo Desarrollo
Para ejecutar el servidor con reinicio automático (usando Nodemon):
```bash
npm run dev
```

El servidor iniciará por defecto en `http://localhost:3000`.

### Generar CRUDs Automáticos
Si agregas un nuevo modelo en la carpeta `models/`, ejecuta el siguiente script para crear automáticamente sus servicios, controladores y rutas:
```bash
node autocrud.js
```

## 🔌 API Endpoints

Las rutas se generan y cargan dinámicamente. Basado en los modelos actuales, los endpoints principales son:

| Recurso | Método | URL Ejemplo | Descripción |
| :--- | :--- | :--- | :--- |
| **Productos** | GET | `/api/productos` | Obtener todos los productos |
| | POST | `/api/productos` | Crear un producto |
| | GET | `/api/productos/:id` | Obtener un producto por ID |
| | PUT | `/api/productos/:id` | Actualizar un producto |
| | DELETE | `/api/productos/:id` | Eliminar un producto |
| **Pruebas** | GET | `/api/prueba` | Endpoints de prueba |
| **Examen** | GET | `/api/examen` | Endpoints de examen |
| **Logs** | GET | `/api/log` | Endpoints de logs |

*Nota: La estructura de URLs sigue el patrón `/api/[nombre_modelo]`.*

## 📂 Estructura del Proyecto

```
.
├── config/              # Configuración de base de datos
├── controllers/         # Lógica de controladores
│   └── base/            # Controladores base generados
├── models/              # Modelos de Sequelize
├── routes/              # Definición de rutas (cargadas dinámicamente)
├── services/            # Lógica de negocio y acceso a datos
├── autocrud.js          # Script generador de código
├── server.js            # Punto de entrada de la aplicación
└── package.json         # Dependencias y scripts
```

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.
