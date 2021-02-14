import { getDistance } from '../Distance/Distance.js';
import * as leagues from '../../data/index.js';

class Distomatic {
  constructor() {
    this.latitude = '37.539';
    this.longitude = '-77.433';

    this.leagues = Object.assign({}, leagues);
    this.activeSports = Object.keys(leagues).reduce((memo, key) => {
      const league = leagues[key];
      memo[league.sport.toLowerCase()] = true;
      return memo;
    }, {});

    const set = Object.keys(this.leagues).reduce((memo, key) => {
      const league = this.leagues[key];
      memo.add(league.sport.toLowerCase());
      return memo;
    }, new Set());

    this.sports = [...set].sort();

    document.addEventListener('toggle:sport', this.handleToggle);
    document.addEventListener('update:location', this.handleLocation);
  }

  handleToggle = ({ detail }) => {
    const sport = detail.sport;
    this.activeSports[sport] = !this.activeSports[sport];
    
    document.dispatchEvent(new CustomEvent('update:filter', {
      detail: {
        activeSports: this.activeSports
      }
    }));
  }

  handleLocation = ({ detail }) => {
    this.latitude = detail?.coords?.latitude;
    this.longitude = detail?.coords?.longitude;

    this.orderLeagues();
  }

  orderLeagues = () => {
    Object.keys(leagues).forEach(key => {
      const league = leagues[key];
      const results = (league.teams || []).reduce((memo, team) => {
        const distance = ~~(getDistance(this.latitude, this.longitude, team.location.latitude, team.location.longitude));
        memo.push(Object.assign({}, team, { distance }));
        return memo;
      }, []);
    
      this.leagues[key] = Object.assign({}, league, { teams: results.sort((a, b) => a.distance - b.distance) });
    })
  }

  getLeagues = () => this.leagues;

  getLeagueKeys = () => Object.keys(this.leagues);

  getLeague = key => this.leagues[key];

  getActiveSports = () => this.activeSports;

  getSports = () => this.sports;

  getTeam = (leagueKey, teamIndex) => {
    const league = this.leagues[leagueKey];
    return league.teams[teamIndex];
  }
}

export const distomatic = new Distomatic();
