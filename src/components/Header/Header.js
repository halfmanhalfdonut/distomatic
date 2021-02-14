class Header extends HTMLElement {
  constructor() {
    super();
  }

  disconnectedCallback() {
    this.removeListeners();
  }

  removeListeners = () => {
    this.form?.removeEventListener('submit', this.handleSubmit);
    this.buttonLocation?.removeEventListener('click', this.handleLocation);
  }

  connectedCallback() {
    this.removeListeners();
    this.render();

    this.form = this.querySelector('form');
    this.form.addEventListener('submit', this.handleSubmit);

    this.inputLatitude = this.querySelector('.input-latitude');
    this.inputLongitude = this.querySelector('.input-longitude');

    this.inputLatitude.value = '37.539';
    this.inputLongitude.value = '-77.433';

    this.buttonSubmit = this.querySelector('.button-go');
    
    this.buttonLocation = this.querySelector('.button-location');
    this.buttonLocation.addEventListener('click', this.handleLocation);

    setTimeout(() => {
      this.handleSubmit(new Event('initial ordering'));
    }, 0);
  }

  handleSubmit = e => {
    e.preventDefault();

    this.handlePosition({
      coords: {
        latitude: this.form.latitude.value,
        longitude: this.form.longitude.value
      }
    });
  }

  handleError() {
    console.error('Geolocation is not enabled .. wahn wahnnn');
  }

  handleLocation = e => {
    e.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.handlePosition, this.handleError, { enableHighAccuracy: true });
    } else {
      this.handleError();
    }
  }

  handlePosition = ({ coords }) => {
    document.dispatchEvent(new CustomEvent('update:location', {
      detail: {
        coords
      }
    }));
  }

  render = () => {
    const html = `
      <header class="header">
        <form class="search">
          <h1 class="title">Dist-o-matic</h1>

          <label class="label label-latitude" for="latitude">Latitude</label>
          <input type="text" name="latitude" class="input input-latitude">

          <label class="label label-longitude" for="longitude">Longitude</label>
          <input type="text" name="longitude" class="input input-longitude">

          <button type="submit" class="button button-go">Go!</button>
          <button type="button" class="button-location" title="Use My Location">
            <img src="/images/location.svg" alt="Use My Location" class="location-icon" />
            Use Your Location
          </button>
        </form>
        <filter-bar></filter-bar>
      </header>
    `;

    this.innerHTML = html;
  }
}

export const header = () => customElements.define('header-bar', Header);
