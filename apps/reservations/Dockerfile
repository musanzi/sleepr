FROM node:22-alpine AS base
RUN npm i -g pnpm
WORKDIR /usr/src/app
COPY package.json ./
COPY pnpm-lock.yaml ./

FROM base AS dev
RUN pnpm i
COPY . .
CMD ["pnpm", "start:dev", "reservations"]

FROM base AS build
RUN pnpm i
COPY . .
RUN pnpm build reservations
RUN pnpm prune --prod

FROM node:22-alpine AS prod
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
CMD ["node", "dist/apps/reservations/main"]
