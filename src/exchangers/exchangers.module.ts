import { forwardRef, Module } from '@nestjs/common';
import { ExchangersService } from './exchangers.service';
import { ExchangersController } from './exchangers.controller';
import { RatesModule } from 'src/rates/rates.module';

@Module({
  imports: [forwardRef(() => RatesModule)],
  controllers: [ExchangersController],
  providers: [ExchangersService],
  exports: [ExchangersService],
})
export class ExchangersModule {}
