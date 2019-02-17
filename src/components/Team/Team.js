class Team {
  constructor(team, units = 'miles') {
    this.team = team;
    this.units = units;

    this.getConference = this.getConference.bind(this);
    this.getDivision = this.getDivision.bind(this);
    this.getName = this.getName.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.getDistance = this.getDistance.bind(this);
    this.getColors = this.getColors.bind(this);
    this.getWebsite = this.getWebsite.bind(this);
    this.getHtml = this.getHtml.bind(this);
  }

  getConference() {
    let html = '';
    if (this.team.conference) {
      html = `${this.team.conference} Conference`;
    }
    return html;
  }

  getDivision() {
    let html = '';
    if (this.team.division) {
      html = `${this.team.division} Division`;
    }
    return html;
  }

  getName() {
    let heading = this.team.city;
    let subheading = this.team.name;

    if (this.team.isNicknameFirst) {
      heading = this.team.name;
      subheading = this.team.city;
    }

    return `<h3 class="team-name-heading">${heading}</h3><h4 class="team-name-subheading">${subheading}</h4>`;
  }

  getAddress() {
    let location = this.team.location;
    return `<i class="fas fa-map-marker-alt"></i><a class="team-link" href="https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}" target="team_location">${location.address}</a>`;
  }

  getDistance() {
    return this.units === 'kilometers' ? `${this.team.distance} kilometers` : `${Math.round(this.team.distance * 0.62137119)} miles`;
  }

  getColors() {
    let teamColors = this.team.colors;
    let width = (100 / teamColors.length).toFixed(2);
    return teamColors.reduce((memo, color) => {
      return memo += `<span class="team-color" style="background-color: ${color}; width: ${width}%;"></span>`;
    }, '');
  }

  getWebsite() {
    return `<a href="${this.team.website}" target="team_web" class="team-link">Team Website <i class="fas fa-external-link-alt"></i></a>`;
  }

  getHtml() {
    return `<div class="team">
      <div class="team-meta">
        <div class="team-conference">${this.getConference()}</div>
        <div class="team-division">${this.getDivision()}</div>
      </div>
      <div class="team-name">${this.getName()}</div>
      <div class="distance">${this.getDistance()} away</div>
      <div class="team-meta team-links">
        <div class="address">${this.getAddress()}</div>
        <div class="team-website">${this.getWebsite()}</div>
      </div>
      <div class="color-bar">${this.getColors()}</div>
    </div>`;
  }
}

export default Team;
