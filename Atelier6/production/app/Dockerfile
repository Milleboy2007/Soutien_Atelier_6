FROM node:lts-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install --omit=dev

COPY server.js ./

ARG APP_VERSION=dev

ENV APP_VERSION=$APP_VERSION
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]