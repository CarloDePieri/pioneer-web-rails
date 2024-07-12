FROM nginx:stable
COPY build /usr/share/nginx/html
RUN chown 101:101 -R /usr/share/nginx/html
COPY docker/certs/ca.pem /etc/ssl/certs/nginx-selfsigned.crt
COPY docker/certs/ca.key /etc/ssl/private/nginx-selfsigned.key
