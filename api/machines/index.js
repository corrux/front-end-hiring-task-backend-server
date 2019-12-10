const handlers = require('./handlers');

const {
  failAction,
} = require('../../utils/helpers');


const register = async (server) => {
  server.route([
    {
      method: 'GET',
      path: '/machines',
      handler: handlers.getAll,
      options: {
        validate: {
          failAction,
        },
      },
    },
  ]);
};

const plugin = {
  register,
  name: 'machinesApi',
  version: '1.0',
};

exports.plugin = plugin;
