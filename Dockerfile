FROM node:16.13.2-alpine
WORKDIR /app

COPY public ./public
COPY api ./api

WORKDIR /app/api
RUN rm .env

WORKDIR /app/public
RUN npm install
RUN npm run build

WORKDIR /app/api
RUN npm install

CMD node index.js