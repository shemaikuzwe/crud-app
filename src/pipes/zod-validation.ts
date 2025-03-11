import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const parsedValue = this.schema.parse(value);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return parsedValue;
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException('Validation failed');
    }
  }
}
