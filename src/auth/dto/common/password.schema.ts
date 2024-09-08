import { z } from 'nestjs-zod/z';

export const passwordSchema = z
  .password()
  .min(8)
  .atLeastOne('lowercase')
  .atLeastOne('uppercase')
  .atLeastOne('digit')
  .atLeastOne('special');
