import { forwardRef, Module } from '@nestjs/common';
import { ExchangersModule } from 'src/exchangers/exchangers.module';
import { RatesService } from './rates.service';

@Module({
  imports: [forwardRef(() => ExchangersModule)],
  providers: [RatesService],
  exports: [RatesService],
})
export class RatesModule {}
