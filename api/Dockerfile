FROM node:20-alpine as builder
WORKDIR /app
COPY . .
RUN npx tsoa spec-and-routes
RUN npm install && npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app .
CMD ["npx", "ts-node", "src/server.ts"]
