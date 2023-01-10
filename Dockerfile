FROM node:16.13.2-alpine
WORKDIR /app

COPY public ./public
COPY api ./api
COPY .env_secrets ./api/.env

WORKDIR /app/public
RUN npm run build

WORKDIR /app/api
RUN npm install --production
COPY node_modules /app/api/node_modules

CMD node index.js