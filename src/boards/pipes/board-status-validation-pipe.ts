import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board-status-enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];
  transform(value: any, _metadata: ArgumentMetadata) {
    value = value.toUpperCase();
    if (this.isStatusValid(value) == false) {
      throw new BadRequestException(`${value} is not in the status`);
    }
    return value;
  }

  isStatusValid(value: any): boolean {
    return this.StatusOptions.includes(value);
  }
}
