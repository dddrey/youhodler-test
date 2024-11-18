import {
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExchangerDto } from './dto/exchanger.dto';
import { CurrencyPairDto } from 'src/rates/dto/currency-pair.dto';
import { RatesService } from 'src/rates/rates.service';
import { CustomCacheInterceptor } from 'src/common/interceptors/custom-cache.interceptor';

@Controller('exchangers')
export class ExchangersController {
  constructor(private readonly ratesService: RatesService) {}

  @Get(':exchangerName/rates')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(CustomCacheInterceptor)
  getRates(
    @Param() exchangerDto: ExchangerDto,
    @Query() currencyPairDto: CurrencyPairDto,
  ) {
    return this.ratesService.applyRatesFor(
      exchangerDto.exchangerName,
      currencyPairDto.pair,
    );
  }
}
