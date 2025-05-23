import { config } from "dotenv";
config();


function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
export const DB_PORT = getEnvVar("DB_PORT");
export const DB_USER = getEnvVar("DB_USER");
export const DB_PASSWORD = getEnvVar("DB_PASSWORD");
export const DB_SERVER = getEnvVar("DB_SERVER");
export const DB_DATABASE = getEnvVar("DB_DATABASE");
export const GEMINI_URL = getEnvVar("GEMINI_URL");
