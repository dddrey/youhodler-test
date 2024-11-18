export const env = {
  vars: {
    updateFrequencyMs: parseInt(process.env.UPDATE_FREQUENCY_MS, 10) || 100,
    port: parseInt(process.env.PORT, 10) || 4001,
  },
  binance: {
    comissionRate: parseFloat(process.env.BINANCE_COMMISSION_RATE) || 0.01,
  },
};

export default () => env;
