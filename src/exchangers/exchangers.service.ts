import { Injectable } from '@nestjs/common';
import { IExchange } from './interfaces/exchange.interface';
import { BinanceExchangeService } from './exchanges/binance.exchange.service';

@Injectable()
export class ExchangersService {
  private exchanges: Record<string, IExchange>;

  constructor(binanceService: BinanceExchangeService) {
    this.exchanges = {
      binance: binanceService,
      // Add other exchanges here
    };
  }

  async getRatesFor(currencyPair: string, exchanger: string) {
    const exchangeService = this.exchanges[exchanger];
    if (!exchangeService) {
      throw new Error(`Exchange ${exchanger} not supported`);
    }

    try {
      return await exchangeService.getRates(currencyPair);
    } catch (error) {
      throw new Error(`Failed to fetch rates from ${exchanger}`);
    }
  }
}
