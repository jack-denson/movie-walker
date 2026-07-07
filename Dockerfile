FROM node:16.13.2-alpine
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