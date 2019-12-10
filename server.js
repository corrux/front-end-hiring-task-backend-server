require('dotenv').config();
const Glue = require('@hapi/glue');
const manifest = require('./config/manifest');

const startServer = async () => {
  try {
    const server = await Glue.compose(manifest, { relativeTo: __dirname });

    await server.start();
    console.log('✅  Server is listening on ' + server.info.uri.toLowerCase());
    process.on('SIGINT', () => {
      console.log('stopping hapi server');
      server.stop({ timeout: 10000 }).then((err) => {
        console.log('hapi server stopped');
        process.exit((err) ? 1 : 0);
      });
    });

    return server;
  } catch (err) {
    console.log('server.register err:', err);
    process.exit((err) ? 1 : 0);
  }
};


module.exports = startServer();
