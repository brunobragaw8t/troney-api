import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const resetSchema = z
  .object({
    email: z.string(),
  })
  .strict();

export class ResetDto extends createZodDto(resetSchema) {}
