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

export default local;
