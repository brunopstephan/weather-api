import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

export default {
  provide: APP_PIPE,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  useClass: ZodValidationPipe,
};
