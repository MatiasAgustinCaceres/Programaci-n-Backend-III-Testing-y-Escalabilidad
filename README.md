# Programaci-n-Backend-III-Testing-y-Escalabilidad

ShipNow API:
API RESTful para la gestión de usuarios, productos, órdenes y entregas. Proyecto desarrollado en Node.js + Express + MongoDB, siguiendo arquitectura en capas y cumpliendo con las consignas de las entregas 1 a 8.

Entregas

Entrega 1 – Usuarios
CRUD de usuarios (/api/users).
Arquitectura en capas: controller → service → repository.
Validación de datos con Mongoose.

Entrega 2 – Productos
CRUD de productos (/api/products).
Relación con usuarios.
Validación de stock y precios.

Entrega 3 – Órdenes
CRUD de órdenes (/api/orders).
Relación con usuarios y productos.
Cálculo de totales.

Entrega 4 – Entregas
CRUD de entregas (/api/deliveries).
Relación con órdenes.
Estados de entrega: pendiente, en curso, completada.

Entrega 5 – Documentación Swagger
Swagger UI en Swagger docs (/api/docs).
.yaml por módulo (users, products, orders, deliveries, mocks, logger).
Schemas reutilizables centralizados.
Documentación de errores.

Entrega 6 – Mocks
Endpoints mocks (/api/mocks) para generar datos de prueba.
Validación de cantidad solicitada.
Documentados en Swagger.

Entrega 7 – Logger
Integración de Winston.
Middleware global de logs.
Endpoint logger (/api/logger) para validar niveles: debug, http, info, warning, error, fatal.

Entrega 8 – Preparación para producción
Health check en health (/api/health).
Validación de variables críticas al inicio.
.env.example actualizado.
Dockerfile y .dockerignore.
Docker Compose con MongoDB.

Instalación local
bash
npm install
npm run dev
API en http://localhost:8080

Swagger en http://localhost:8080/api/docs

Health check en http://localhost:8080/api/health

Variables de entorno
Archivo .env:

bash
PORT=8080
MONGODB_URI=mongodb://localhost:27017/shipnow
JWT_SECRET=secret
NODE_ENV=development
LOG_LEVEL=info
Archivo .env.example incluido para referencia.

Docker
Construir imagen
bash
docker build -t shipnow-api .
Ejecutar contenedor
bash
docker run -p 8080:8080 --env-file .env shipnow-api
Docker Compose
Levantar API + Mongo
bash
docker-compose up --build
Frenar contenedores
bash
docker-compose down
Ejecutar en segundo plano
bash
docker-compose up -d

Endpoints principales
/api/users → Usuarios
/api/products → Productos
/api/orders → Ordenes
/api/deliveries → Entregas
/api/mocks → Mocks
/api/logger → Logger
/api/health → Health check
/api/docs → Swagger docs

Endpoints internos (solo dev/test)
Swagger (/api/docs) → disponible en desarrollo y testing.
Mocks (/api/mocks) → solo para pruebas.
Logger (/api/logger) → validación de logs, no funcionalidad de negocio.