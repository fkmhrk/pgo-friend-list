FROM nginx:alpine

RUN apk add --no-cache ca-certificates
COPY start_server.sh /srv/
COPY default.conf /etc/nginx/conf.d
COPY dist /srv/web/

ENTRYPOINT ["sh", "/srv/start_server.sh"]
