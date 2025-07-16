# Étape 1 : construire l'app
FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npm run build

# Étape 2 : serveur NGINX pour servir l'app
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Supprimer la configuration par défaut de Nginx et copier la tienne (optionnel)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
