FROM node:alpine AS base
WORKDIR /usr/src/app
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
RUN npm i -g pnpm

FROM base AS dev
RUN pnpm i
COPY . .
CMD ["pnpm", "run", "start:dev", "auth"]

FROM base AS build
RUN pnpm i --prod
COPY . .
RUN pnpm run build auth


FROM node:alpine AS prod
ENV NODE_ENV=${STAGE}
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist

CMD ["pnpm", "run", "start:prod", "auth"]
