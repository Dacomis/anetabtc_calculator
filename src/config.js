import { config } from "dotenv";

config();

if (!process.env.PORT) {
  process.env.PORT = 3001;
}

if (!process.env.BLOCK_FROST_API_KEY) {
  throw new Error("No good api key");
}

export function get(name) {
  return process.env[name];
}
