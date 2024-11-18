import { Injectable } from '@nestjs/common';
import { IExchange } from '../interfaces/exchange.interface';

@Injectable()
export class BinanceExchangeService implements IExchange {
  async getRates(currencyPair: string): Promise<any> {
    const url = `https://api.binance.com/api/v3/ticker/bookTicker?symbol=${currencyPair}`;
    const response = await fetch(url);
    const data = await response.json();

    return {
      symbol: data.symbol,
      bidPrice: data.bidPrice,
      bidQty: data.bidQty,
      askPrice: data.askPrice,
      askQty: data.askQty,
    };
  }
}
