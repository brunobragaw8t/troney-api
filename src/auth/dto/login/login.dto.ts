import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const loginSchema = z
  .object({
    email: z.string(),
    password: z.string(),
  })
  .strict();

export class LoginDto extends createZodDto(loginSchema) {}
