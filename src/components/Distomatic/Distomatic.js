import NFL from '../../data/nfl.js';
import NHL from '../../data/nhl.js';
import Distance from '../Distance/Distance.js';

const sports = [
  {
    league: 'NFL',
    data: NFL
  },
  {
    league: 'NHL',
    data: NHL
  }
];

class Distomatic {
  constructor(coords) {
    this.distance = new Distance();
    this.latitude = coords.latitude;
    this.longitude = coords.longitude;
  }

  getLeagues() {
    let teams = {};

    sports.forEach(sport => {
      let results = sport.data.reduce((memo, team) => {
        memo.push({
          distance: ~~(this.distance.getDistance(this.latitude, this.longitude, team.location.latitude, team.location.longitude)),
          team: team
        });

        return memo;
      }, []);

      teams[sport.league] = results.sort((a, b) => a.distance - b.distance);
    });

    return teams;
  }
}

export default Distomatic;
