<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# create postgres container
$ docker compose up -d

# apply migrations
$ npx prisma migrate deploy

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API

```
All endpoints are described in the /doc/postman.json file for Postman.
```
