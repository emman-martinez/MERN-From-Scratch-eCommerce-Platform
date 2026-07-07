import { env } from './config/env.ts';
import { MongoDatabase } from './data/mongo/mongo-database.ts';
import { AppRoutes } from './presentation/routes.ts';
import { Server } from './presentation/server.ts';

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    dbName: env.MONGO_DB_NAME,
    mongoUrl: env.MONGO_URI,
  });

  const server = new Server({
    port: env.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}
