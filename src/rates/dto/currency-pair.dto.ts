import { IsIn } from 'class-validator';

export class CurrencyPairDto {
  @IsIn(['BTCUSDT'])
  pair: string;
}
