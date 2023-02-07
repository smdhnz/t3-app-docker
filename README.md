
# Create T3 app simple login

## use

- Next.js
- Prisma
- tRPC
- zod
- react hook form
- Mantine
    - core
    - hooks
    - notifications
    - nprogress
    - datatable


## create .env

```sh
cp .env.example .env
```

change `DATABASE_URL`

## local development

```sh
yarn prisma migrate dev
yarn prisma db seed
yarn dev
```

## docker compose

```sh
docker compose up --build
```
