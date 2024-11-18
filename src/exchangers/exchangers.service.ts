import { Injectable } from '@nestjs/common';
import { CurrencyPairDto } from '../rates/dto/currency-pair.dto';
import { ExchangerDto } from './dto/exchanger.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExchangersService {
  constructor(private readonly configService: ConfigService) {}

  async getRatesFor(
    currencyPair: CurrencyPairDto['pair'],
    exchanger: ExchangerDto['exchangerName'],
  ) {
    const url = `https://api.binance.com/api/v3/ticker/bookTicker?symbol=${currencyPair}`;

    // add cache for UPDATE_FREQUENCY seconds

    try {
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      // Handle error appropriately
      throw new Error('Failed to fetch rates from Binance');
    }
  }
}
