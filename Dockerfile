# Étape de construction
FROM node:14 as build-step
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape de production
FROM nginx:latest
COPY --from=build-step /app/dist/wedding-moment /usr/share/nginx/html