import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CurrencyPairDto } from './dto/currency-pair.dto';
import { ExchangersService } from 'src/exchangers/exchangers.service';
import { ExchangerDto } from 'src/exchangers/dto/exchanger.dto';

@Injectable()
export class RatesService {
  constructor(
    private readonly exchangersService: ExchangersService,
    private readonly configService: ConfigService,
  ) {}

  async applyRatesFor(
    exchanger: ExchangerDto['exchangerName'],
    pair: CurrencyPairDto['pair'],
  ) {
    const serviceCommission = this.configService.get<number>(
      'vars.serviceCommission',
    );
    const rates = await this.exchangersService.getRatesFor(pair, exchanger);
    const adjustedBid =
      parseFloat(rates.bidPrice) * (1 - serviceCommission / 100);
    const adjustedAsk =
      parseFloat(rates.askPrice) * (1 + serviceCommission / 100);
    const midPrice = (adjustedBid + adjustedAsk) / 2;

    return {
      pair,
      bidPrice: adjustedBid,
      askPrice: adjustedAsk,
      midPrice,
    };
  }
}
