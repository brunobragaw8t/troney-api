import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const resendActivationEmailSchema = z
  .object({
    email: z.string().email(),
  })
  .strict();

export class ResendActivationEmailDto extends createZodDto(
  resendActivationEmailSchema,
) {}
