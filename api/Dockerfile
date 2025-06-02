FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app .
CMD ["npx", "ts-node", "src/index.ts"]
