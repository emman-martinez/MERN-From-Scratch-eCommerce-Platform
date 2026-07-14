import dotenv from 'dotenv';
import envVar from 'env-var';
import { fileURLToPath } from 'node:url';

// Always load the repository-level .env, regardless of the directory from
// which npm, Node, or an editor starts the backend process. This relative path
// is valid for both src/config/env.ts and the compiled dist/config/env.js.
dotenv.config({
  path: fileURLToPath(new URL('../../../.env', import.meta.url)),
});

export const env = {
  NODE_ENV: envVar.get('NODE_ENV').default('development').asString(),
  PORT: envVar.get('PORT').required().asPortNumber(),
  MONGO_URI: envVar.get('MONGO_URI').required().asString(),
  MONGO_DB_NAME: envVar.get('MONGO_DB_NAME').required().asString(),
  JWT_SECRET: envVar.get('JWT_SECRET').required().asString(),
};
