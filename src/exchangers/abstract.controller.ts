import { CalcResponse, CurrencyPairInput } from './dto/exchanger.dto';
import { Get, Query } from '@nestjs/common';
import { AbstractExchangerService } from './abstract.service';

export abstract class AbstractExchangerController {
  constructor(protected service: AbstractExchangerService) {}

  @Get('rates')
  getRates(@Query() currencyPairDto: CurrencyPairInput): Promise<CalcResponse> {
    return this.service.calcRate(currencyPairDto.pair);
  }
}
