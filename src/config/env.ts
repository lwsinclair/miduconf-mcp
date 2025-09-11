import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  YOUTUBE_API_KEY: z.string().min(1, "YOUTUBE_API_KEY is required"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const msgs = parsed.error.errors
    .map((e) => `${e.path.join(".")}: ${e.message}`)
    .join("\n");
  throw new Error(`Invalid environment variables:\n${msgs}`);
}

export const ENV = parsed.data;
