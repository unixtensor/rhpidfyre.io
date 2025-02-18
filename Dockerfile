FROM oven/bun AS build

COPY package.json astro.config.mjs /tmp/
COPY src public /tmp/

RUN bun run build

