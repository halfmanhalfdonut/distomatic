import Distomatic from './src/components/Distomatic/Distomatic.js';

class App {
  constructor(root) {
    this.root = root;

    this.handlePosition = this.handlePosition.bind(this);
    this.handleError = this.handleError.bind(this);
    this.render = this.render.bind(this);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.handlePosition, this.handleError);
    } else {
      this.handleError();
    }
  }

  handlePosition(position) {
    this.root.innerHTML = `Your location: Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
    let distomatic = new Distomatic(position.coords);
    this.render(distomatic.getLeagues());
  }

  handleError() {
    this.root.innerHTML = 'You need to allow your location for this to work, sorry!';
  }

  render(leagues) {
    this.root.innerHTML += '<p>Your closest teams per league are listed below</p>';

    Object.keys(leagues).forEach(key => {
      let html = `<table>`;
      html += `<tr><th><strong>${key}</strong></th><th>Team</th><th>Distance</th><th>City</th></tr>`;

      let teams = leagues[key];

      teams.forEach((team, index) => {
        html += `<tr><td>${index + 1}</td><td>${team.team.city} ${team.team.name}</td><td>${Math.round(team.distance * 0.62137119)}mi (${team.distance}km)</td><td>${team.team.location.address}</td></tr>`;
      });

      html += '</table>';
      this.root.innerHTML += html;
    });
  }
}

new App(document.getElementById('results'));
