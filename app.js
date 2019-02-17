import * as Leagues from './src/data/index.js';

import Distomatic from './src/components/Distomatic/Distomatic.js';
import Nav from './src/components/Nav/Nav.js';
import League from './src/components/League/League.js';

class App {
  constructor() {
    this.setupElements();

    this.handlePosition = this.handlePosition.bind(this);
    this.handleError = this.handleError.bind(this);
    this.render = this.render.bind(this);
    this.handleGo = this.handleGo.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.toggleSport = this.toggleSport.bind(this);

    this.search.addEventListener('submit', this.handleGo);
    this.nav.addEventListener('click', this.handleFilter);

    this.distomatic = null;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.handlePosition, this.handleError);
    } else {
      this.handleError();
    }
  }

  setupElements() {
    this.results = document.getElementById('results');
    this.search = document.getElementById('search');
    this.nav = document.getElementById('nav');
    this.latitude = document.getElementById('latitude');
    this.longitude = document.getElementById('longitude');
    this.button = document.getElementById('button');
  }

  handlePosition(position) {
    this.latitude.value = parseFloat(position.coords.latitude).toFixed(3);
    this.longitude.value = parseFloat(position.coords.longitude).toFixed(3);

    if (!this.distomatic) {
      this.distomatic = new Distomatic();
    }

    this.distomatic.updateCoordinates(position.coords);
    this.render(Object.keys(Leagues).map(key => Leagues[key]));
  }

  handleError() {
    this.results.innerHTML = 'You need to allow your location for this to work, sorry!';
  }

  handleGo(e) {
    e.preventDefault();
    this.button.disabled = true;

    let [ latitude, longitude ] = this.search.elements;
    let position = {
      coords: {
        latitude: latitude.value,
        longitude: longitude.value
      }
    };

    this.handlePosition(position);
    this.button.disabled = false;
  }

  handleFilter(e) {
    e.preventDefault();

    let target = e.target;
    let sport = target.getAttribute('data-sport');

    e.target.classList.toggle('sport-visible');

    if (sport) {
      this.toggleSport(sport);
    }
  }

  toggleSport(sport) {
    document.querySelectorAll(`.sport-${sport}`).forEach(el => el.classList.toggle('hidden'));
  }

  render(leagues) {
    let leagueData = new League();
    this.nav.innerHTML = new Nav().getHtml(leagues);
    this.results.innerHTML = leagues.reduce((memo, league) => {
      let orderedLeague = this.distomatic.getOrderedLeague(league);
      return memo += leagueData.getHtml(orderedLeague);
    }, '');
  }
}

new App();
