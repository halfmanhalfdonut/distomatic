import { distomatic } from '../Distomatic/Distomatic.js';

class League extends HTMLElement {
  constructor() {
    super();

    this.leagueKey = this.getAttribute('data-key');
    this.league = distomatic.getLeague(this.leagueKey);
  }

  connectedCallback() {
    const shortName = this.league.shortName;
    const html = `
      <section class="league league-${shortName.toLowerCase()} sport-${this.league.sport.toLowerCase()}">
        <a name="${shortName}">&nbsp;</a>
        <header class="league-header">
          <h2 class="league-name">
            <span title="${this.league.fullName}">${this.league.shortName}</span>
            <a class="league-link" href="${this.league.website}" target="league_website"><i class="fas fa-external-link-alt"></i></a>
          </h2>
        </header>
        <ol class="teams">${this.getTeams()}</ol>
      </section>
    `;

    this.innerHTML = html;
  }

  getTeams = () => {
    return this.league.teams.reduce((memo, _, i) => {
      return `${memo}<li class="team-item"><team-section data-league="${this.leagueKey}" data-team="${i}"></team-section></li>`;
    }, '');
  }
}

export const league = () => customElements.define('league-section', League);
