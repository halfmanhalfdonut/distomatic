import { distomatic } from '../Distomatic/Distomatic.js';

class Results extends HTMLElement {
  constructor() {
    super();

    this.leagues = distomatic.getLeagues();
    this.activeSports = distomatic.getActiveSports();

    document.addEventListener('update:location', this.render);
    document.addEventListener('update:filter', this.handleFilterUpdate);
  }

  disconnectedCallback() {
    document.removeEventListener('update:location', this.render);
    document.removeEventListener('update:filter', this.handleFilterUpdate);
  }

  handleFilterUpdate = ({ detail }) => {
    this.activeSports = detail.activeSports;
    this.render();
  }

  render = () => {
    const keys = Object.keys(this.activeSports);
    const filteredSports = keys.filter(key => this.activeSports[key]);

    let html = `<div class="results">`;
    html += Object.keys(this.leagues).reduce((memo, key) => {
      const league = this.leagues[key];

      if (filteredSports.includes(league.sport.toLowerCase())) {
        return `${memo}<league-section data-key="${key}"></league-section>`;
      } else {
        return memo;
      }
    }, '');
    html += `</div>`;

    this.innerHTML = html;
  }
}

export const results = () => customElements.define('results-section', Results);
