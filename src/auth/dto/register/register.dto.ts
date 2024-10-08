import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { passwordSchema } from '../common/password.schema';

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: passwordSchema,
    name: z.string().min(2),
  })
  .strict();

export class RegisterDto extends createZodDto(registerSchema) {}
