const Path = require('path');
const configuration = require('./config');

const envKey = (key) => {
  const env = process.env.NODE_ENV || 'development';
  return configuration[env][key];
};

const manifest = {
  server: {
    port: envKey('port'),
    host: envKey('host'),
    routes: {
      cors: {
        origin: ['*'],
        credentials: true,
        headers: [
          'Accept',
          'Authorization',
          'Content-Type',
          'If-None-Match',
          'Accept-language',
          'cache-control',
          'x-requested-with',
        ],
      },
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    },
    router: {
      stripTrailingSlash: true
    },
  },
  register: {
    plugins: [
      {
        plugin: './api/machines',
      },
      {
        plugin: '@hapi/good',
        options: {
          ops: { interval: 60000 },
          reporters: {
            console: [{
              module: '@hapi/good-squeeze',
              name: 'Squeeze',
              args: [{
                error: '*',
                response: { exclude: 'health' },
                log: '*',
                ops: '*',
              }]
            }, {
              module: '@hapi/good-console'
            }, 'stdout']
          }
        }
      }
    ]
  }
};

if (envKey('httpsOnly')) {
  manifest.register.plugins = [
    {
      plugin: 'hapi-require-https',
      options: {
        proxy: envKey('httpsOnly'),
      },
    },
    ...manifest.register.plugins,
  ];
}

module.exports = manifest;
