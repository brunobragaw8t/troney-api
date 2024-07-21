import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z
      .password()
      .min(8)
      .atLeastOne('lowercase')
      .atLeastOne('uppercase')
      .atLeastOne('digit')
      .atLeastOne('special'),
    name: z.string().min(2),
  })
  .strict();

export class RegisterDto extends createZodDto(registerSchema) {}
