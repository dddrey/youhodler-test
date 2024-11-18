import { IsIn } from 'class-validator';

export class ExchangerInput {
  @IsIn(['binance'])
  exchangerName: string;
}

export class CurrencyPairInput {
  @IsIn(['BTCUSDT', 'LTCBTC', 'USDTBTC'])
  pair: string;
}

export class ExchangerResponse {
  symbol: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
}

export class CalcResponse {
  symbol: string;
  bidPrice: number;
  askPrice: number;
  midPrice: number;
}
