module.exports = {
  development: {
    host: process.env.HOST,
    port: parseInt(process.env.PORT || 8081),
    httpsOnly: false,
  },
  test: {
    host: 'localhost',
    port: 8082,
    httpsOnly: false,
  },
  staging: {
    host: process.env.HOST,
    port: parseInt(process.env.PORT || 8081),
    httpsOnly: true,
  },
  production: {
    host: process.env.HOST,
    port: parseInt(process.env.PORT || 8081),
    httpsOnly: true,
  },
};
