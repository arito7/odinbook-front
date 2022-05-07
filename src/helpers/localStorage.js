const local = {
  get: (key) => {
    if (window.localStorage) {
      return JSON.parse(window.localStorage.getItem(key));
    }
    return null;
  },
  set: (key, value) => {
    if (window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  },
  del: (key) => {
    if (window.localStorage) {
      window.localStorage.removeItem(key);
    }
  },
};

local.setJwt = function (token) {
  console.log('saving token to local');
  this.set('jwt', token);
};

local.getJwt = function () {
  console.log('retreiving token from local');
  return this.get('jwt');
};

local.delJwt = function () {
  console.log('removing token from local');
  this.del('jwt');
};

export default local;
