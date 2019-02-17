import League from './League';
import { NHL } from '../../data';

describe('League', () => {
  const league = new League();

  it('Gets a short name', () => {
    let actual = league.getName(NHL, 'short');

    expect(actual).toBe(NHL.shortName);
  });

  it('Gets a long name', () => {
    let actual = league.getName(NHL);

    expect(actual).toBe(NHL.fullName);
  });

  it('Gets Team HTML', () => {
    let teams = [ NHL.teams[0] ];

    let actual = league.getTeams(teams);
    expect(actual).toContain(NHL.teams[0].city);
    expect(actual).toContain(NHL.teams[0].name);
    expect(actual).toContain('<li class="team-item">');
  });

  it('Gets an empty string when no teams are passed', () => {
    let actual = league.getTeams([]);
    expect(actual).toBe('');
  });

  it('Gets League HTML', () => {
    let actual = league.getHtml(NHL);

    expect(actual).toContain(NHL.teams[4].city);
    expect(actual).toContain(NHL.teams[8].name);
    expect(actual).toContain(`league-${NHL.shortName.toLowerCase()}`);
  });
});
