FROM node:20-alpine

WORKDIR /app
COPY . .

# Instalar dependencias usando workspaces
RUN npm install

# Compilar la librería compartida
RUN npm run build --workspace=@velocity/shared

# Compilar Next.js app
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build --workspace=web

EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000

CMD ["npm", "run", "start", "--workspace=web"]
