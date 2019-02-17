import Distomatic from './Distomatic'
import { NFL } from '../../data';

describe('Distomatic', () => {
  const distomatic = new Distomatic();

  it('Updates coordinates based on those passed in', () => {
    distomatic.updateCoordinates({ latitude: 24, longitude: -75 });
    expect(distomatic.latitude).toBe(24);
    expect(distomatic.longitude).toBe(-75);
  });

  it('Orders a league', () => {
    // Set location to Soldier Field
    distomatic.updateCoordinates({ latitude: 41.863, longitude: -87.617 });

    let actual = distomatic.getOrderedLeague(NFL);
    let actualTeam = actual.teams[0];

    expect(actualTeam.city).toBe('Chicago');
    expect(actualTeam.distance).toBe(0);
  });

  it('Returns a league with an empty list of teams for an invalid league', () => {
    let actual = distomatic.getOrderedLeague({});
    expect(actual).toEqual({teams: []});
  });
});
