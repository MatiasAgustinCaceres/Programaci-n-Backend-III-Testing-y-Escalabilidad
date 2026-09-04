# Imagen base oficial de Node
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json primero
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto (el mismo que uses en .env)
EXPOSE 8080

# Comando para arrancar la app
CMD ["npm", "start"]
