import { forwardRef, Module } from '@nestjs/common';
import { ExchangersService } from './exchangers.service';
import { ExchangersController } from './exchangers.controller';
import { RatesModule } from 'src/rates/rates.module';
import { BinanceExchangeService } from './exchanges/binance.exchange.service';

@Module({
  imports: [forwardRef(() => RatesModule)],
  controllers: [ExchangersController],
  providers: [ExchangersService, BinanceExchangeService],
  exports: [ExchangersService],
})
export class ExchangersModule {}
