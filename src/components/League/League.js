import Team from '../Team/Team.js';

class League {
  constructor() {
    this.getName = this.getName.bind(this);
    this.getTeams = this.getTeams.bind(this);
    this.getHtml = this.getHtml.bind(this);
  }

  getName(league, version) {
    return version === 'short' ? league.shortName : league.fullName;
  }

  getTeams(teams) {
    return teams.reduce((memo, data) => {
      let team = new Team(data);
      return `${memo}<li class="team-item">${team.getHtml()}</li>`;
    }, '');
  }

  getHtml(league) {
    let shortName = this.getName(league, 'short').toLowerCase();
    return `<section class="league league-${shortName} sport-${league.sport.toLowerCase()}">
      <a name="${shortName}">&nbsp;</a>
      <header class="league-header">
        <h2 class="league-name">
          ${this.getName(league)}
          <a class="league-link" href="${league.website}" target="league_website"><i class="fas fa-external-link-alt"></i></a>
        </h2>
      </header>
      <ol class="teams">${this.getTeams(league.teams)}</ol>
    </section>`;
  }
}

export default League;
