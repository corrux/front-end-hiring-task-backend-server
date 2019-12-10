const data = require('./machines.json');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const radomizeMAchineData = (machine) => {
  return {
    ...machine,
    metrics: {
      def_remaining: getRandomInt(0,100),
      engine_status: getRandomInt(0,1),
      fuel_remaining: getRandomInt(0, 100),
      last_activity: `2019-12-${getRandomInt(0,31)}T00:00:00.000`
    },
  };
};

module.exports.getAll = () => {
  return data.map(radomizeMAchineData);
};
