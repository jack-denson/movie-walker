# Build from the repo root (see docker-compose.yml: build.context is ".")
# so /public, /api, and the shared /helpers folder are all in the build context.
FROM node:24.18-alpine3.23
WORKDIR /app

COPY public ./public
COPY api ./api
COPY helpers ./helpers
# Env (DB/Redis conn strings, TMDB key) is injected at runtime by docker-compose.

# api requires ../helpers/*, which resolve their own deps from /app/helpers/node_modules
WORKDIR /app/helpers
RUN npm install --production

WORKDIR /app/public
RUN npm install --production
RUN npm run build

WORKDIR /app/api
RUN npm install --production

CMD node index.js