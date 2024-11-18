export default () => ({
  vars: {
    updateFrequencyMs: parseInt(process.env.UPDATE_FREQUENCY_MS, 10) || 100,
    serviceCommission: parseFloat(process.env.SERVICE_COMMISSION) || 0.01,
    port: parseInt(process.env.PORT, 10) || 4001,
  },
});
