import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const config = {
  port: process.env.PORT || 5000,
  node_env: process.env.NODE_ENV || 'development',
  database_uri: process.env.DATABASE_URI!,
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET!,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || '30m',
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET!,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
};

if (
  !config.database_uri ||
  !config.jwt_access_secret ||
  !config.jwt_refresh_secret
) {
  throw new Error('Missing required environment variables');
}

export default config;
