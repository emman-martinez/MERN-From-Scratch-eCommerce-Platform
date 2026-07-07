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
