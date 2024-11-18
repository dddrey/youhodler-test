import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

import { RatesModule } from './rates/rates.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangersModule } from './exchangers/exchangers.module';
import configuration from './config/configuration';
@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    CacheModule.register({ isGlobal: true }),
    RatesModule,
    ExchangersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
