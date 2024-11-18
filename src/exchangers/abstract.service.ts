import {
  CalcResponse,
  CurrencyPairInput,
  ExchangerResponse,
} from './dto/exchanger.dto';

export abstract class AbstractExchangerService {
  async calcRate(pair: CurrencyPairInput['pair']): Promise<CalcResponse> {
    const comissionRate = this.getComissionRate();

    const rate = await this.getExchangeRates(pair);
    const adjustedBid = parseFloat(rate.bidPrice) * (1 - comissionRate / 100);
    const adjustedAsk = parseFloat(rate.askPrice) * (1 + comissionRate / 100);
    const midPrice = (adjustedBid + adjustedAsk) / 2;

    return {
      symbol: rate.symbol,
      bidPrice: adjustedBid,
      askPrice: adjustedAsk,
      midPrice,
    };
  }

  abstract getExchangeRates(
    currencyPair: CurrencyPairInput['pair'],
  ): Promise<ExchangerResponse>;

  abstract getComissionRate(): number;
}
