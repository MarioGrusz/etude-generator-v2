import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd(); // Current working directory
loadEnvConfig(projectDir); // Load .env variables into process.env
