# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

EXPOSE 4000 4173
ENV NODE_ENV=production

CMD ["sh", "-c", "npm run server & npm run preview -- --host 0.0.0.0 --port 4173"]
