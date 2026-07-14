# ProShop

MERN eCommerce app with Docker support for local development.

## Setup

Install dependencies from the project root:

```powershell
npm install
npm install --workspace backend
npm install --workspace frontend
```

Create your local environment file:

```powershell
copy .env.example .env
```

## Environment Variables

The project uses a single environment file: `.env` in the project root, next
to the root `package.json`. Both Docker Compose and the backend read their
configuration from this file. Do not create or use `backend/.env`.

The backend resolves the root `.env` explicitly, so it works the same whether
it is started from the project root, from `backend/`, or from an editor.

The `.env` file contains local credentials and is intentionally ignored by
Git. Therefore, after cloning the project on a new computer, create it from the
committed example:

```powershell
copy .env.example .env
```

Then replace the example values in `.env` with the configuration for that
computer. Never commit the resulting `.env` file.

Authentication requires `JWT_SECRET`:

```env
JWT_SECRET=replace-with-a-long-random-secret
```

Use a long, random value and never commit your real secret. The backend uses
this value to sign and verify authentication tokens. When running with Docker,
`docker-compose.yml` passes `JWT_SECRET` from the root `.env` file into the
backend container.

After changing environment variables for an existing container, recreate the
backend so it receives the new values:

```powershell
docker compose up -d --force-recreate backend
```

## Run With Docker

Start the containers in detached mode:

```powershell
npm run docker:up:dev
```

View backend logs in real time:

```powershell
npm run docker:logs:backend
```

View all container logs:

```powershell
npm run docker:logs
```

If you change Dockerfiles or dependencies, rebuild the images:

```powershell
npm run docker:up
```

If you add or remove dependencies while using Docker, renew the anonymous `node_modules` volumes:

```powershell
npm run docker:up:renew
```

Stop the containers:

```powershell
npm run docker:down
```

Stop the containers and remove the MongoDB volume:

```powershell
npm run docker:clean
```

### Start Docker From Scratch

Use this procedure when testing the project on another computer, when the
MongoDB volume was created with old credentials, or when you want a completely
empty local database.

> **Warning:** this permanently deletes the local MongoDB data stored by this
> project. It does not delete the source code or the root `.env` file.

From the project root, stop the containers and remove their volumes:

```powershell
npm run docker:clean
```

Confirm that the root `.env` has the desired values. When using the local
Docker MongoDB, the credentials used in `MONGO_URI` must match
`MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD`, and the project
uses `MONGO_DB_NAME` everywhere for the database name.

Then rebuild the images and create new containers and volumes:

```powershell
npm run docker:up
```

MongoDB applies its `MONGO_INITDB_*` settings only when it initializes an empty
volume. Changing those values in `.env` does not update users in an existing
MongoDB volume; run `npm run docker:clean` before starting again when those
credentials change.

In another terminal, check that every service started successfully:

```powershell
docker compose ps
npm run docker:logs:backend
```

The commands have different purposes:

- `npm run docker:down` stops and removes containers but preserves MongoDB
  data.
- `npm run docker:up:renew` rebuilds images and renews anonymous volumes such
  as container `node_modules`; it preserves the named MongoDB data volume.
- `npm run docker:clean` stops containers and deletes the MongoDB data volume,
  allowing MongoDB to initialize again from the current `.env` values.

### Fresh Setup on Another Computer

After cloning the repository, run:

```powershell
copy .env.example .env
npm install
npm run docker:up
```

Edit the root `.env` before the final command. Do not create `backend/.env`.
If that computer already ran an older version of the project, run
`npm run docker:clean` before `npm run docker:up`.

### Seed the Database

The seed imports the sample users and products included in the repository.
Importing the seed first deletes the existing orders, products, and users in
the configured database, so do not run it against data you need to preserve.

When the project is running with Docker, execute the seed inside the backend
container. This uses the container connection configured with the MongoDB host
name `mongo`:

```powershell
docker compose exec backend node src/data/seed/seed.ts
```

To delete the orders, products, and users without importing the samples again:

```powershell
docker compose exec backend node src/data/seed/seed.ts -d
```

When running the backend directly on the computer instead of Docker, use the
root npm scripts:

```powershell
npm run data:import
npm run data:destroy
```

For direct local execution, `MONGO_URI` must be reachable from the computer;
use `localhost` for a local Docker MongoDB port or use an Atlas connection
string. The host name `mongo` only resolves between Docker Compose containers.

After a completely clean Docker start, a common sequence is:

```powershell
npm run docker:clean
npm run docker:up
```

Then, from another terminal:

```powershell
docker compose exec backend node src/data/seed/seed.ts
```

## Local URLs

Frontend:

```text
http://localhost:5173
```

Backend health check:

```text
http://localhost:5000/api/health
```

MongoDB Compass:

```text
mongodb://admin:supersecret@localhost:27017/proshop?authSource=admin
```

## MongoDB Configuration

There are two main ways to run MongoDB with this project:

- Local development with Docker: MongoDB runs in the `mongo` container from
  `docker-compose.yml`. You do not need MongoDB installed directly on your
  computer.
- MongoDB Atlas: MongoDB runs in the cloud, and the app connects through an
  Atlas `mongodb+srv://...` connection string.

When using Docker local MongoDB, the backend container must use the Docker
service name `mongo` as the host:

```env
MONGO_URI=mongodb://admin:supersecret@mongo:27017/proshop?authSource=admin
MONGO_DB_NAME=proshop
```

That URI works from inside Docker because the backend and MongoDB containers are
on the same Compose network.

For MongoDB Compass on your machine, use `localhost` instead because Compass is
running outside Docker:

```text
mongodb://admin:supersecret@localhost:27017/proshop?authSource=admin
```

Both URIs point to the same local Docker MongoDB data, but they are used from
different places:

```text
backend container -> mongo:27017
your computer/Compass -> localhost:27017
```

To use MongoDB Atlas, replace the active `MONGO_URI` in `.env` with your Atlas
connection string and keep `MONGO_DB_NAME` as the database name:

```env
MONGO_URI=mongodb+srv://user:password@proshop-cluster.xxxxx.mongodb.net/proshop?retryWrites=true&w=majority&appName=proshop-cluster
MONGO_DB_NAME=proshop
```

Atlas also needs to allow the IP address that is connecting to the cluster.
For local development, you can go to Atlas > Network Access and add:

```text
0.0.0.0/0
```

This allows connections from any IP address, which is convenient when your home
network IP changes. Use it only for development. Before going to production,
remove `0.0.0.0/0` and allow only the specific server, hosting provider, or
trusted IP addresses that should connect to the database.

To open the same Atlas database in MongoDB Compass, use the same Atlas
connection string in Compass. If the backend and Compass both use the Atlas URI,
both tools point to the same remote database:

```text
mongodb+srv://user:password@proshop-cluster.xxxxx.mongodb.net/proshop?retryWrites=true&w=majority&appName=proshop-cluster
```

Only keep one `MONGO_URI` active at a time. Leave the other examples commented
out so it is clear whether the backend is using local Docker MongoDB or Atlas.

## Live Reload

The Docker setup mounts the local `backend` and `frontend` folders into their containers.

Backend changes are watched by:

```text
tsx watch src/app.ts
```

When running Docker on Windows, file-change events can sometimes be missed by the
container. The Compose setup enables polling for the backend watcher, so saving a
controller should restart the backend and show the updated response in the
browser or Postman.

If a controller change does not appear after refreshing, restart only the backend:

```powershell
docker compose restart backend
```

Frontend changes are handled by Vite.
