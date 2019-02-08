import Distomatic from './src/components/Distomatic/Distomatic.js';

class App {
  constructor() {
    this.setupElements();

    this.handlePosition = this.handlePosition.bind(this);
    this.handleError = this.handleError.bind(this);
    this.render = this.render.bind(this);
    this.handleGo = this.handleGo.bind(this);

    this.search.addEventListener('submit', this.handleGo);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.handlePosition, this.handleError);
    } else {
      this.handleError();
    }
  }

  setupElements() {
    this.results = document.getElementById('results');
    this.search = document.getElementById('search');
    this.latitude = document.getElementById('latitude');
    this.longitude = document.getElementById('longitude');
    this.button = document.getElementById('button');
  }

  handlePosition(position) {
    this.latitude.value = position.coords.latitude;
    this.longitude.value = position.coords.longitude;

    let distomatic = new Distomatic(position.coords);
    this.render(distomatic.getLeagues());
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

  render(leagues) {
    Object.keys(leagues).forEach(key => {
      let html = `<table class="table table-${key.toLowerCase()}">`;
      html += `<tr class="table-header-row"><th>${key}</th><th>Team</th><th>Distance</th><th>City</th></tr>`;

      let teams = leagues[key];

      teams.forEach((team, index) => {
        html += `<tr class="table-row"><td>${index + 1}</td><td>${team.team.city} ${team.team.name}</td><td>${Math.round(team.distance * 0.62137119)}mi (${team.distance}km)</td><td>${team.team.location.address}</td></tr>`;
      });

      html += '</table>';
      this.results.innerHTML += html;
    });
  }
}

new App();
