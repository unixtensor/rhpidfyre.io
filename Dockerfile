FROM oven/bun

COPY package.json .
COPY astro.config.mjs .
COPY src/ .
COPY public/ .

