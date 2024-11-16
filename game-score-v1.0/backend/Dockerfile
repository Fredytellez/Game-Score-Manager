# Etapa de desarrollo
FROM node:18-alpine AS development

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:18-alpine AS production

# Argumentos para definir el NODE_ENV
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar solo las dependencias de producción
RUN npm install --only=production

# Copiar el código construido desde la etapa de desarrollo
COPY --from=development /usr/src/app/dist ./dist

# Exponer el puerto
EXPOSE ${PORT}

# Comando para ejecutar la aplicación
CMD ["node", "dist/main"]