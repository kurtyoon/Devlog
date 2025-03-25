FROM node:20-alpine AS development-dependencies-env
RUN npm install -g pnpm
COPY . /app
WORKDIR /app
RUN pnpm install

FROM node:20-alpine AS production-dependencies-env
RUN npm install -g pnpm
COPY ./package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN pnpm install --prod

FROM node:20-alpine AS build-env
RUN npm install -g pnpm
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN pnpm run build

FROM node:20-alpine
RUN npm install -g pnpm
COPY ./package.json pnpm-lock.yaml /app/
COPY .env /app/.env
COPY /app/shared/contents/posts /app/app/shared/contents/posts
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build

WORKDIR /app
CMD ["pnpm", "start"]