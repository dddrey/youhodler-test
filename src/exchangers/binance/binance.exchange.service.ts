import { Injectable } from '@nestjs/common';
import { AbstractExchangerService } from '../abstract.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BinanceExchangeService extends AbstractExchangerService {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  async getExchangeRates(currencyPair) {
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

  getComissionRate() {
    return this.configService.get<number>('binance.comissionRate');
  }
}
