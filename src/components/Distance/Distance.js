class Distance {
  constructor() {
    this.cache = {};
  }

  getRadians(degrees) {
    // If we've already calculated this particular value, return the cached value
    if (this.cache[degrees]) {
      return this.cache[degrees];
    }

    let radians = parseFloat(degrees) * (Math.PI / 180);

    // Cache this value so we don't have to recalculate it every time
    this.cache[degrees] = radians;
    return radians;
  }

  // See haversine function here: https://en.wikipedia.org/wiki/Versine#Haversine
  getAngle(delta) {
    return Math.pow(Math.sin(delta / 2), 2);
  }

  // See Haversine Formula here: https://en.wikipedia.org/wiki/Haversine_formula
  getDistance(pLatitude, pLongitude, qLatitude, qLongitude) {
    const R = 6371; // Radius of the Earth in km
    let radians = {
      pLatitude: this.getRadians(pLatitude),
      pLongitude: this.getRadians(pLongitude),
      qLatitude: this.getRadians(qLatitude),
      qLongitude: this.getRadians(qLongitude)
    };

    let latitudeDelta = radians.qLatitude - radians.pLatitude;
    let longitudeDelta = radians.qLongitude - radians.pLongitude;

    let angle = this.getAngle(latitudeDelta) + Math.cos(radians.pLatitude) * Math.cos(radians.qLatitude) * this.getAngle(longitudeDelta);

    return 2 * R * Math.asin(Math.sqrt(angle));
  }
}

export default Distance;
