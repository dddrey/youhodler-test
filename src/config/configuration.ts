export default () => ({
  vars: {
    updateFrequencyMs: parseInt(process.env.UPDATE_FREQUENCY_MS, 10) || 1000,
    port: parseInt(process.env.PORT, 10) || 4001,
    serviceCommission: parseFloat(process.env.SERVICE_COMMISSION) || 0.01,
  },
});
