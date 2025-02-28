FROM oven/bun AS builder

WORKDIR /rhpidfyre.io

COPY ../packages/web/src ../packages/web/package.json ../packages/web/vite.config.js ../packages/web/tsconfig.json ./

RUN bun run install
RUN bun run build --emptyOutDir

FROM joseluisq/static-web-server

COPY --from=builder /rhpidfyre.io/dist .

EXPOSE 8787/tcp

ENTRYPOINT [ "static-web-server", "-p", "8787", "-d", "dist/", "-g", "trace" ]