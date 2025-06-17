import path from 'path';
import dotenv from 'dotenv';

// read root .env.development for jest
function setEnvVars() {
  const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
  const envPath = path.join(__dirname, envFile);
  const env = dotenv.config({ path: envPath });
  if (env.error) {
    throw new Error(env.error.message);
  }
}

setEnvVars();
