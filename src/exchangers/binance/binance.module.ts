import { Module } from '@nestjs/common';
import { BinanceExchangeService } from './binance.exchange.service';
import { BinanceController } from './binance.controller';

@Module({
  providers: [BinanceExchangeService],
  controllers: [BinanceController],
})
export class BinanceModule {}
