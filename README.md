# Programación Backend III - Testing y Escalabilidad

## ShipNow API
API RESTful para la gestión de usuarios, productos, órdenes y entregas. Proyecto desarrollado en Node.js + Express + MongoDB, siguiendo arquitectura en capas y cumpliendo con las consignas de las entregas 1 a 8.

---

## Entregas y Funcionalidades

* Entrega 1 – Usuarios: CRUD de usuarios (/api/users) con paginación (page, limit). Arquitectura en capas (controller -> service -> repository) y validación de datos con Mongoose.
* Entrega 2 – Productos: CRUD de productos (/api/products) con paginación (page, limit), relación con usuarios, validación de stock y precios.
* Entrega 3 – Órdenes: CRUD de órdenes (/api/orders) con paginación (page, limit), relación con usuarios y productos, y cálculo de totales.
* Entrega 4 – Entregas: CRUD de entregas (/api/deliveries) con paginación (page, limit), relación con órdenes y estados de entrega (pendiente, en curso, completada).
* Entrega 5 – Documentación Swagger: Swagger UI en /api/docs. Archivos .yaml por módulo (users, products, orders, deliveries, mocks, logger), schemas reutilizables centralizados y documentación de errores.
* Entrega 6 – Mocks: Endpoints mocks (/api/mocks) para generar datos de prueba con validación de cantidad solicitada y documentación en Swagger.
* Entrega 7 – Logger: Integración de Winston con middleware global de logs. Endpoint /api/logger para validar niveles (debug, http, info, warning, error, fatal).
* Entrega 8 – Preparación para producción: Health check en /api/health, validación de variables críticas al inicio, .env.example actualizado, Dockerfile y .dockerignore optimizados, y Docker Compose con MongoDB con volumen persistente.

---

## Instalación y Ejecución Local

npm install
npm run dev

* API Base: http://localhost:8080
* Swagger Docs: http://localhost:8080/api/docs
* Health Check: http://localhost:8080/api/health

---

## Ejecución de Tests

Para ejecutar la suite de pruebas unitarias y de integración con Mocha y Chai:

Localmente:
npm test

Desde Docker Compose:
docker compose exec shipnow-api npm test

---

## Variables de Entorno

Crear un archivo .env en la raíz del proyecto basado en .env.example:

PORT=8080
MONGODB_URI=mongodb://localhost:27017/shipnow
JWT_SECRET=secret
NODE_ENV=development
LOG_LEVEL=info

---

## Docker y Docker Compose

### Construir y ejecutar imagen individual
docker build -t shipnow-api .
docker run -p 8080:8080 --env-file .env shipnow-api

### Docker Compose (API + MongoDB)
# Levantar servicios
docker compose up --build

# Levantar en segundo plano
docker compose up -d

# Detener contenedores
docker compose down

---

## Endpoints Principales

* /api/users -> Gestión de usuarios (soporta page y limit)
* /api/products -> Gestión de productos (soporta page y limit)
* /api/orders -> Gestión de órdenes (soporta page y limit)
* /api/deliveries -> Gestión de entregas (soporta page y limit)
* /api/mocks -> Mocks (entorno dev/test)
* /api/logger -> Prueba de logger (entorno dev/test)
* /api/health -> Health check de la aplicación
* /api/docs -> Documentación Swagger UI