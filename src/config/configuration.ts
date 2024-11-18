export default () => ({
  UPDATE_FREQUENCY_MS: parseInt(process.env.UPDATE_FREQUENCY_MS, 10) || 100,
  SERVICE_COMMISSION: parseFloat(process.env.SERVICE_COMMISSION) || 0.01,
  PORT: parseInt(process.env.PORT, 10) || 4001,
});
