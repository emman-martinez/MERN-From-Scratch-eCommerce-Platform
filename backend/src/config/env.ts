import 'dotenv/config';
import envVar from 'env-var';

export const env = {
  NODE_ENV: envVar.get('NODE_ENV').default('development').asString(),
  PORT: envVar.get('PORT').required().asPortNumber(),
  MONGO_URI: envVar.get('MONGO_URI').required().asString(),
  MONGO_DB_NAME: envVar.get('MONGO_DB_NAME').required().asString(),
  JWT_SECRET: envVar.get('JWT_SECRET').required().asString(),
};
