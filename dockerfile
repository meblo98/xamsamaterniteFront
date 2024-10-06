# Utiliser une image officielle Node.js comme base
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code de l'application
COPY . .

# Compiler l'application
RUN npm run build

# Exposer le port que l'application utilisera
EXPOSE 8080

# Exécuter la commande pour lancer l'application
CMD ["npm", "run", "serve"]