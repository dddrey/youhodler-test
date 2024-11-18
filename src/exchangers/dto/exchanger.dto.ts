import { IsIn } from 'class-validator';

export class ExchangerDto {
  @IsIn(['binance'])
  exchangerName: string;
}
