# Docker containers

Docker containers used to serve the webapp over https.

These can be useful for development, because certain features of the webapp require https to work (namely the pwa install).
They also serve as an example of how to deploy the webapp in a production environment.

### Prerequisites

Provide the `ca.pem` and `ca.key` files in the `certs` directory.

The CA that signed the certificates must be trusted by the system used to test the webapp.

## Nginx

This is a web server used to serve the webapp over https with a bare-bone config.

### Usage

The webapp must be built before starting the web server, for example with:

```bash
npm run build
```

To start the web server, run the following command:

```bash
cd nginx
docker-compose up
```

To stop the web server, press `Ctrl+C`.

To delete the web server, run the following command:

```bash
cd nginx
docker-compose down
```

## Traefik reverse proxy

This is a reverse proxy used to serve the webapp over https.

### Usage

The webapp must be served by either `npm run dev` or `npm run preview`.

Copy the `traefik/.env.example` file to `traefik/.env` and fill in the required values (with the right port depending on
where the webapp is being served).

To start the reverse proxy, run the following command:

```bash
cd traefik
docker-compose up
```

To stop the web server, press `Ctrl+C`.

To delete the web server, run the following command:

```bash
cd nginx
docker-compose down
```
