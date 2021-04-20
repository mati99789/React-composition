export default class API {
  constructor() {
    this.url = 'http://localhost:3005/meetings';
  }

  loadData() {
    return this._fetch();
  }

  addData(data) {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this._fetch(options);
  }

  searchMeeting(additionalPath) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this._fetch(options, additionalPath);
  }

  _fetch(options, additionalPath = '') {
    const url = this.url + additionalPath;
    return fetch(url, options).then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error('Network Error');
    });
  }
}
