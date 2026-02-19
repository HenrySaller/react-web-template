import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.url().optional(),
})

export const config = envSchema.parse(import.meta.env)
