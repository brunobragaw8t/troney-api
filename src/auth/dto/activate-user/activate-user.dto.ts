import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const activateUserSchema = z
  .object({
    token: z.string(),
  })
  .strict();

export class ActivateUserDto extends createZodDto(activateUserSchema) {}
