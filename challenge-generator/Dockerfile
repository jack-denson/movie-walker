FROM node:24.18-alpine3.23
WORKDIR /app

COPY helpers ./helpers
COPY challenge-generator ./challenge-generator

WORKDIR /app/helpers
RUN npm install --omit=dev

WORKDIR /app/challenge-generator
RUN npm install --omit=dev

#`docker compose run --rm challenge-generator 10`
ENTRYPOINT ["node", "generateChallenge.js"]
