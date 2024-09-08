import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { passwordSchema } from '../common/password.schema';

export const resetPasswordSchema = z
  .object({
    token: z.string(),
    password: passwordSchema,
  })
  .strict();

export class ResetPasswordDto extends createZodDto(resetPasswordSchema) {}
