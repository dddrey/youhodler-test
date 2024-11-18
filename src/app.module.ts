import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangersModule } from './exchangers/exchangers.module';
import { RatesModule } from './rates/rates.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    RatesModule,
    ExchangersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
