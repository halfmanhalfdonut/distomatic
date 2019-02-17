class Nav {
  getHtml(leagues) {
    let set = leagues.reduce((memo, league) => {
      memo.add(league.sport);
      return memo;
    }, new Set());

    let html = '';
    set.forEach(sport => {
      html += `<div class="selection-sport" data-sport="${sport.toLowerCase()}">${sport}</div>`
    });

    return html;
  }
}

export default Nav;
