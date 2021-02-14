import { distomatic } from '../Distomatic/Distomatic.js';

class Filter extends HTMLElement {
  constructor() {
    super();

    this.activeSports = distomatic.getActiveSports();
    this.sports = distomatic.getSports();

    this.addEventListener('click', this.handleClick);
  }

  handleClick = e => {
    if (e.target.classList.contains('selection-sport')) {
      e.target.classList.toggle('sport-invisible');

      document.dispatchEvent(new CustomEvent('toggle:sport', {
        detail: {
          sport: e.target.getAttribute('data-sport')
        }
      }))
    }
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
  }

  render = () => {
    let html = `<nav class="nav">`;
    this.sports.forEach(sport => {
      html += `<button id="filter-${sport.toLowerCase()}" class="selection-sport" data-sport="${sport.toLowerCase()}">${sport}</button>`;
    });
    html += `</nav>`;

    this.innerHTML = html;
  }
}

export const filter = () => customElements.define('filter-bar', Filter);
