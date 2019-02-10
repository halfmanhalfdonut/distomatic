import Distomatic from './src/components/Distomatic/Distomatic.js';

class App {
  constructor() {
    this.setupElements();

    this.handlePosition = this.handlePosition.bind(this);
    this.handleError = this.handleError.bind(this);
    this.render = this.render.bind(this);
    this.handleGo = this.handleGo.bind(this);
    this.renderColors = this.renderColors.bind(this);

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

  renderColors(colors) {
    return colors.reduce((memo, color) => memo += `<span class="team-color" style="background-color: ${color}"></span>`, '');
  }

  render(leagues) {
    this.results.innerHTML = '';

    Object.keys(leagues).forEach(key => {
      let lowerKey = key.toLowerCase();
      let html = `<table class="table table-${lowerKey}">
        <tr class="table-header-row">
          <th><a name="league-${lowerKey}></a>${key}</th>
          <th>Team</th>
          <th>Distance</th>
          <th>City</th>
          <th>Colors</th>
        </tr>`;

      let teams = leagues[key];

      teams.forEach((team, index) => {
        html += `<tr class="table-row">
          <td>${index + 1}</td>
          <td>${team.team.city} ${team.team.name}</td>
          <td>${Math.round(team.distance * 0.62137119)}mi (${team.distance}km)</td>
          <td><a href="https://www.google.com/maps/search/?api=1&query=${team.team.location.latitude},${team.team.location.longitude}" target="team_location">${team.team.location.address}</a></td>
          <td>${this.renderColors(team.team.colors)}</td>
        </tr>`;
      });

      html += '</table>';
      this.results.innerHTML += html;
    });
  }
}

new App();
