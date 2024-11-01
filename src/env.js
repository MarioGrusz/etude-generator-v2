import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    // No test-specific variables included here
  },
  client: {
    // Client-side variables here
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    // Only include variables that are necessary for production and development
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
