FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@11.0.8 --activate
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

FROM base AS dev
RUN pnpm i
COPY . .
RUN pnpm build auth

FROM node:22-alpine AS prod
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=dev /usr/src/app/dist ./dist
COPY --from=dev /usr/src/app/node_modules ./node_modules
CMD ["node", "dist/apps/auth/main"]
