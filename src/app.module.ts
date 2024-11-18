import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

import { ExchangersModule } from './exchangers/exchangers.module';
import configuration from './config/configuration';
@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    CacheModule.register({ isGlobal: true }),
    ExchangersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
