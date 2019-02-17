import Team from './Team';
import { MLB } from '../../data';

describe('Team', () => {
  const mlbTeam = MLB.teams[0];
  const team = new Team(mlbTeam);
  const fake = new Team({});

  it('Gets a team conference', () => {
    let actual = team.getConference();
    expect(actual).toBe(`${mlbTeam.conference} Conference`);
  });

  it('Gets an empty string for a team with no conference', () => {
    let actual = fake.getConference();
    expect(actual).toBe('');
  });

  it('Gets a team division', () => {
    let actual = team.getDivision();
    expect(actual).toBe(`${mlbTeam.division} Division`);
  });

  it('Gets an empty string for a team with no division', () => {
    let actual = fake.getDivision();
    expect(actual).toBe('');
  });

  it('Gets a team name and city', () => {
    let actual = team.getName();
    expect(actual).toContain(mlbTeam.city);
    expect(actual).toContain(mlbTeam.name);
    expect(actual).toContain('<h3 class="team-name-heading">');
  });

  it('Handles nickname first', () => {
    let fakeTeam = {
      city: 'Kansas City',
      name: 'Sporting',
      isNicknameFirst: true
    };

    let nnf = new Team(fakeTeam);
    let actual = nnf.getName();
    expect(actual).toContain(`<h3 class="team-name-heading">${fakeTeam.name}</h3>`);
    expect(actual).toContain(`<h4 class="team-name-subheading">${fakeTeam.city}</h4>`);
  });

  it('Gets a team address', () => {
    let actual = team.getAddress();
    expect(actual).toContain(mlbTeam.location.address);
    expect(actual).toContain('google.com/maps');
  });

  it('Gets the distance in kilometers', () => {
    team.units = 'kilometers';
    team.team.distance = 6;
    let actual = team.getDistance();
    expect(actual).toBe(`${mlbTeam.distance} kilometers`);
  });

  it('Gets the distance in miles', () => {
    team.units = 'miles';
    team.team.distance = 6;
    let actual = team.getDistance();
    expect(actual).toBe(`${Math.round(mlbTeam.distance * 0.62137119)} miles`);
  });

  it('Gets team colors', () => {
    let actual = team.getColors();
    mlbTeam.colors.forEach(color => {
      expect(actual).toContain(color);
    });
  });

  it('Gets team website', () => {
    let actual = team.getWebsite();
    expect(actual).toContain(mlbTeam.website);
  });

  it('Generates full team HTML', () => {
    let actual = team.getHtml();
    expect(actual).toContain(mlbTeam.conference);
    expect(actual).toContain(mlbTeam.division);
    expect(actual).toContain(mlbTeam.colors[0]);
    expect(actual).toContain(mlbTeam.website);
    expect(actual).toContain('<div class="color-bar">');
    expect(actual).toContain('<div class="team">');
  });

});
