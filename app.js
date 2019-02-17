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

    this.search.addEventListener('submit', this.handleGo);
    this.filter.addEventListener('submit', this.handleFilter);

    this.sport = 'all';
    this.league = 'all';
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
    this.filter = document.getElementById('filter');
    this.latitude = document.getElementById('latitude');
    this.longitude = document.getElementById('longitude');
    this.button = document.getElementById('button');
  }

  handlePosition(position) {
    this.latitude.value = position.coords.latitude.toFixed(3);
    this.longitude.value = position.coords.longitude.toFixed(3);

    if (!this.distomatic) {
      this.distomatic = new Distomatic();
    }

    this.distomatic.updateCoordinates(position.coords);

    // TODO: Filter
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

    let [ sport, league ] = this.filter.elements;
    console.log(sport, league);
  }

  render(leagues) {
    let leagueData = new League();
    this.results.innerHTML = leagues.reduce((memo, league) => {
      let orderedLeague = this.distomatic.getOrderedLeague(league);
      return memo += leagueData.getHtml(orderedLeague);
    }, '');
  }
}

new App();
