import { IExchangerResponse } from './exchanger.interface';

export interface IExchange {
  getRates(currencyPair: string): Promise<IExchangerResponse>;
}
