FROM node:20.15.0-alpine AS base
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN npm i -g pnpm@9.12.0

FROM base AS dependencies

WORKDIR /app
COPY /package.json /pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules/
ENV NODE_ENV=production
RUN pnpm build
RUN pnpm prune --prod

FROM base AS deploy

WORKDIR /app
COPY --from=build /app/dist ./dist/
COPY --from=build /app/node_modules ./node_modules/
COPY --from=build /app/package.json /app/pnpm-lock.yaml ./

ARG PORT
ARG UPDATE_FREQUENCY_MS
ARG SERVICE_COMMISSION

ENV PORT=${PORT}
ENV UPDATE_FREQUENCY_MS=${UPDATE_FREQUENCY_MS}
ENV SERVICE_COMMISSION=${SERVICE_COMMISSION}

EXPOSE ${PORT}

HEALTHCHECK  --interval=4s --timeout=1s \
  CMD wget --no-verbose --tries=1 --spider http://0.0.0.0:${PORT}/ || exit 1

CMD [ "pnpm", "run", "start:prod" ]
