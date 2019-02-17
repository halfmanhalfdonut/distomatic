import Nav from './Nav';
import * as LeagueData from '../../data';

describe('Nav', () => {
  const nav = new Nav();
  const leagues = Object.keys(LeagueData).map(key => LeagueData[key]);

  it('Gets nav HTML', () => {
    let actual = nav.getHtml(leagues);

    leagues.forEach(league => {
      expect(actual).toContain(league.sport);
      expect(actual).toContain(`<div class="selection-sport" data-sport="${league.sport.toLowerCase()}">`);
    });
  });

  it('Gets empty string if no leagues are passed in', () => {
    let actual = nav.getHtml([]);
    expect(actual).toBe('');
  });

});
