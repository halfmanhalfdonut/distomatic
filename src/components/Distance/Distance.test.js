import Distance from './Distance'

describe('Distance', () => {
  const toFixed = (value, places) => Number(value.toFixed(places));
  const dist = new Distance();

  it('Converts Degrees to Radians', () => {
    // Degrees and expected value provided by google
    let degrees = 20;
    let expected = 0.349066;

    expect(toFixed(dist.getRadians(degrees), 6)).toBe(expected);
  });

  it('Fetches a cached value when available', () => {
    // Degrees and expected value provided by google
    let degrees = 45;
    let expected = 0.785398;

    // Run this operation to set a cache value
    dist.getRadians(degrees);

    // Expect the cache to have that value stored
    expect(toFixed(dist.cache['45'], 6)).toBe(expected);
  });

  it('Provides accurate distance between points', () => {
    // Expected values from google maps "measure distance" functionality
    let zzqLatitude = 37.568751;
    let zzqLongitude = -77.471347;
    let parkLatitude = 37.526218;
    let parkLongitude = -77.411407;
    let rvaExpected = 7.09;

    let capitolLatitude = 37.539452;
    let capitolLongitude = -77.433992;
    let arenaLatitude = 35.803331;
    let arenaLongitude = -78.722137;
    let hockeyExpected = 224.64;

    let rvaDistance = toFixed(dist.getDistance(zzqLatitude, zzqLongitude, parkLatitude, parkLongitude), 2);
    let hockeyDistance = toFixed(dist.getDistance(capitolLatitude, capitolLongitude, arenaLatitude, arenaLongitude), 2);

    expect(rvaDistance).toBe(rvaExpected);
    expect(hockeyDistance).toBe(hockeyExpected);
  });
});
