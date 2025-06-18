FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/src ./src
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/processorLogic ./processorLogic
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.mjs ./

EXPOSE 3000

CMD ["node", "server.js"]