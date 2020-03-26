const data = require('./machines.json');

const MIN_LAT = 48.141216;
const MAX_LAT = 48.143999;
const MIN_LON = 48.141216;
const MAX_LON = 48.143999;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomLocation() {
  return {
    latitude: Math.random() * 1.1 * (MAX_LAT - MIN_LAT) + MIN_LAT,
    longitude: Math.random() * 1.1 * (MAX_LON - MIN_LON) + MIN_LON,
  };
}

function isMachineInBounds(coords) {
  return (
    coords.latitude > MIN_LAT &&
    coords.latitude < MAX_LAT &&
    coords.longitude > MIN_LON &&
    coords.longitude < MAX_LON
  );
}

const radomizeMAchineData = (machine) => {
  const coordinates = getRandomLocation();
  return {
    ...machine,
    location: {
      ...machine.location,
      ...coordinates,
    },
    metrics: {
      def_remaining: getRandomInt(0,100),
      engine_status: getRandomInt(0,1),
      fuel_remaining: getRandomInt(0, 100),
      last_activity: `2019-12-${getRandomInt(0,31)}T00:00:00.000`,
      in_bounds: isMachineInBounds(coordinates),
    },
  };
};

module.exports.getAll = () => {
  return data.map(radomizeMAchineData);
};
