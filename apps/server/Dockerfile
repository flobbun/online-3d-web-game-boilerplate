FROM docker.io/node:lts-alpine

WORKDIR /app

RUN addgroup --system server && \
          adduser --system -G server server

COPY dist/apps/server server
RUN chown -R server:server .

RUN npm --prefix server --omit=dev -f install

CMD [ "node", "server" ]
