# Utilisez l'image officielle de Node.js 20.15.0
FROM node:20.15.0-alpine

# Définissez le répertoire de travail
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez tous les fichiers de l'application
COPY . .

# Construisez l'application pour la production (si nécessaire)
RUN npm run build

# Exposez le port 80 pour servir l'application
EXPOSE 5173

# Démarrez l'application en mode développement
CMD ["npm","run", "dev"]
