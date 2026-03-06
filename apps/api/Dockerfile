FROM node:20-alpine

WORKDIR /app
COPY . .

# Instalar dependencias usando workspaces en la raíz
RUN npm install

# Compilar dependencias compartidas
RUN npm run build --workspace=@velocity/shared

# Generar Prisma Client
RUN cd apps/api && npx prisma generate

# Compilar la API
RUN npm run build --workspace=api

# Exponer puerto 3001
EXPOSE 3001
ENV NODE_ENV=production

CMD ["npm", "run", "start:prod", "--workspace=api"]
