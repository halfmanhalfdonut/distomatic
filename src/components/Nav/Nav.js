class Nav {
  constructor() {
    this.getKeys = this.getKeys.bind(this);
    this.getLeagues = this.getLeagues.bind(this);
    this.getLeagueHtml = this.getLeagueHtml.bind(this);
    this.getSportsHtml = this.getSportsHtml.bind(this);
    this.getHtml = this.getHtml.bind(this);
  }

  getKeys(leaguesData) {
    return Object.keys(leaguesData);
  }

  getLeagues(leaguesData, keys) {
    return keys.reduce((memo, key) => {
      memo.push(leaguesData[key]);
      return memo;
    }, []);
  }

  getSportsHtml(leagues) {
    let set = leagues.reduce((memo, league) => {
      memo.add(league.sport);
      return memo;
    }, new Set());

    return set.values().reduce((memo, sport) => {
      return `${memo}<option value="${sport.toLowerCase()}">${sport}</option>`
    }, '');
  }

  getLeagueHtml(keys) {
    return keys.reduce((memo, key) => {
      return `${memo}<option value="${key.toLowerCase()}">${key}</option>`;
    }, '');
  }

  getHtml(leaguesData) {
    let keys = this.getKeys(leaguesData);
    let leagues = this.getLeagues(leaguesData, keys);

    /*return `<nav class="nav">
      <label for="sports">Sports</label>
      <select id="sports" name="sport">
        <option value="all">All</option>
        ${this.getSportsHtml(leagues)}
      </select>
      <label for="leagues">Leagues</label>
      <select id="leagues" name="league">
        <option value="all">All</option>
        ${this.getLeagueHtml(keys)}
      </select>
      <button type="submit">Filter</button>
    </nav>`;*/

    return keys.reduce((memo, key) => {
      return `${memo}<a href="#${key.toLowerCase()}">${key}</a>&nbsp;|&nbsp;`
    }, '');
  }
}

export default Nav;
