/**
 * Axios documentation: https://github.com/axios/axios
 */
const axios = require('axios').default;

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: 'http://127.0.0.1:3001/',
  timeout: 3000,
  validateStatus: function(status) {
    if(status >= 200 && status < 400) {
      return true;
    }
    return false;
  }
});

export default instance;