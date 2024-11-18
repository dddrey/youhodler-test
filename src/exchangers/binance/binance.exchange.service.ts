import { Inject, Injectable } from '@nestjs/common';
import { AbstractExchangerService } from '../abstract.service';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class BinanceExchangeService extends AbstractExchangerService {
  constructor(
    @Inject(CACHE_MANAGER) cacheManager: Cache,
    configService: ConfigService,
  ) {
    super(cacheManager, configService);
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
    return this.configService.get<number>('vars.serviceCommission');
  }
}
