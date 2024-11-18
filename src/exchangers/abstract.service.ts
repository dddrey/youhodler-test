import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import {
  CalcResponse,
  CurrencyPairInput,
  ExchangerResponse,
} from './dto/exchanger.dto';

export abstract class AbstractExchangerService {
  constructor(
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
    protected configService: ConfigService,
  ) {}

  async calcRate(pair: CurrencyPairInput['pair']): Promise<CalcResponse> {
    const cacheKey = `calculated-rate-${pair}`;
    const cached = await this.cacheManager.get(cacheKey);

    if (cached) {
      return cached as CalcResponse;
    }

    const comissionRate = this.getComissionRate();

    const rate = await this.getExchangeRates(pair);
    const adjustedBid = parseFloat(rate.bidPrice) * (1 - comissionRate / 100);
    const adjustedAsk = parseFloat(rate.askPrice) * (1 + comissionRate / 100);
    const midPrice = (adjustedBid + adjustedAsk) / 2;

    const calcResponse: CalcResponse = {
      symbol: rate.symbol,
      bidPrice: adjustedBid,
      askPrice: adjustedAsk,
      midPrice,
    };

    await this.cacheManager.set(
      cacheKey,
      calcResponse,
      this.configService.get<number>('vars.updateFrequencyMs'),
    );

    return calcResponse;
  }

  abstract getExchangeRates(
    currencyPair: CurrencyPairInput['pair'],
  ): Promise<ExchangerResponse>;

  abstract getComissionRate(): number;
}
