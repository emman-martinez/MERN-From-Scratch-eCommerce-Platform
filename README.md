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
MONGO_DATABASE=proshop
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
connection string and keep `MONGO_DATABASE` as the database name:

```env
MONGO_URI=mongodb+srv://user:password@proshop-cluster.xxxxx.mongodb.net/proshop?retryWrites=true&w=majority&appName=proshop-cluster
MONGO_DATABASE=proshop
```

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
