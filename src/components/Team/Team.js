class Team {
  constructor(units = 'miles') {
    this.units = units;

    this.getName = this.getName.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.getDistance = this.getDistance.bind(this);
    this.getColors = this.getColors.bind(this);
    this.getHtml = this.getHtml.bind(this);
  }

  getName(team) {
    let heading = team.city;
    let subheading = team.name;

    if (team.isNicknameFirst) {
      heading = team.name;
      subheading = team.city;
    }

    return `<h3 class="team-name-heading">${heading}</h3><h4 class="team-name-subheading">${subheading}</h4>`;
  }

  getAddress(location) {
    return `<i class="fas fa-map-marker-alt"></i><a class="team-address" href="https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}" target="team_location">${location.address}</a>`;
  }

  getDistance(team) {
    return this.units === 'kilometers' ? `${team.distance} kilometers` : `${Math.round(team.distance * 0.62137119)} miles`;
  }

  getColors(teamColors) {
    let width = (100 / teamColors.length).toFixed(2);
    return teamColors.reduce((memo, color) => {
      return memo += `<span class="team-color" style="background-color: ${color}; width: ${width}%;"></span>`;
    }, '');
  }

  getHtml(team) {
    return `<div class="team">
      <div class="team-name">${this.getName(team)}</div>
      <div class="distance">${this.getDistance(team)} away</div>
      <div class="address">${this.getAddress(team.location)}</div>
      <div class="color-bar">${this.getColors(team.colors)}</div>
    </div>`;
  }
}

export default Team;
