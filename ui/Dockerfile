FROM node:20-alpine AS builder

# Instalar Java
RUN apk add --no-cache openjdk11

# Instalar openapi-generator-cli
RUN npm install -g @openapitools/openapi-generator-cli

WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
