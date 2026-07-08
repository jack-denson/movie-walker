FROM node:24.18-alpine3.23
WORKDIR /app

COPY public ./public
COPY api ./api
# Env (DB/Redis conn strings, TMDB key) is injected at runtime by docker-compose.

WORKDIR /app/public
RUN npm install --production
RUN npm run build

WORKDIR /app/api
RUN npm install --production

CMD node index.js