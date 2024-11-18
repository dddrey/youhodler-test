import { Controller } from '@nestjs/common';
import { AbstractExchangerController } from '../abstract.controller';
import { BinanceExchangeService } from './binance.exchange.service';

@Controller('exchangers/binance')
export class BinanceController extends AbstractExchangerController {
  constructor(service: BinanceExchangeService) {
    super(service);
  }
}
