FROM nginx:alpine

# Installation de Node.js et npm
RUN apk update && apk add --no-cache nodejs npm

# Exécution de Nginx lors du démarrage du conteneur
CMD ["nginx", "-g", "daemon off;"]
