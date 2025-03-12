FROM node:alpine3.21

WORKDIR /app

COPY . .

RUN corepack enable pnpm && pnpm i

RUN npx prisma generate --schema=./src/prisma/schema.prisma

COPY . .

RUN corepack enable pnpm && pnpm run build


EXPOSE 3000

CMD [ "node","dist/main.js" ]