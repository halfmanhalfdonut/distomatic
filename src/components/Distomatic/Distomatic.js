import Distance from '../Distance/Distance.js';

class Distomatic {
  constructor() {
    this.updateCoordinates = this.updateCoordinates.bind(this);
    this.getOrderedLeague = this.getOrderedLeague.bind(this);

    this.distance = new Distance();
  }

  updateCoordinates(coords) {
    this.latitude = coords.latitude;
    this.longitude = coords.longitude;
  }

  getOrderedLeague(league) {
    let results = league.teams.reduce((memo, team) => {
      let distance = ~~(this.distance.getDistance(this.latitude, this.longitude, team.location.latitude, team.location.longitude));
      memo.push(Object.assign({}, team, { distance: distance }));
      return memo;
    }, []);

    return Object.assign({}, league, { teams: results.sort((a, b) => a.distance - b.distance) });
  }
}

export default Distomatic;
