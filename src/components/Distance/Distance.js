let cache = {};

const getRadians = degrees => {
  if (cache[degrees]) {
    return cache[degrees];
  }

  const radians = parseFloat(degrees) * (Math.PI / 180);

  cache[degrees] = radians;
  return radians;
};

// See haversine function here: https://en.wikipedia.org/wiki/Versine#Haversine
const getAngle = delta => Math.pow(Math.sin(delta / 2), 2);

// Radius of the earth in km
const R = 6371; 

// See Haversine Formula here: https://en.wikipedia.org/wiki/Haversine_formula
const getDistance = (pLatitude, pLongitude, qLatitude, qLongitude) => {
  const pLatitudeRadians = getRadians(pLatitude);
  const pLongitudeRadians = getRadians(pLongitude);
  const qLatitudeRadians = getRadians(qLatitude);
  const qLongitudeRadians = getRadians(qLongitude);

  const latitudeDelta = qLatitudeRadians - pLatitudeRadians;
  const longitudeDelta = qLongitudeRadians - pLongitudeRadians;
  const angle = getAngle(latitudeDelta) + Math.cos(pLatitudeRadians) * Math.cos(qLatitudeRadians) * getAngle(longitudeDelta);

  return 2 * R * Math.asin(Math.sqrt(angle));
}

export {
  getRadians,
  getAngle,
  getDistance
};
