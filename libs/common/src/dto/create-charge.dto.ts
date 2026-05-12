import { ValidateNested } from 'class-validator';
import { CardDto } from './card.dto';
import { Type } from 'class-transformer';

export class CreateChargeDto {
  @ValidateNested()
  @Type(() => CardDto)
  card!: CardDto;

  amount!: number;
}
