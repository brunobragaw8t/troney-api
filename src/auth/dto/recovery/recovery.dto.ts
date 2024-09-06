import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const recoverySchema = z
  .object({
    email: z.string(),
  })
  .strict();

export class RecoveryDto extends createZodDto(recoverySchema) {}
