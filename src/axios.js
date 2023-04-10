// import axios library
import axios from 'axios';

// create an axios instance
const instance = axios.create({
  baseURL: 'http://localhost:8000'
});

// add an interceptor to the axios instance
instance.interceptors.request.use(
  config => {
    // check if the request is for login
    if (config.url.endsWith('login')) {
      return config;
    }

    // set the authorization header with the token from local storage, if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    } else {
      // redirect to login page if no token is available
    //   window.location.href = '/login';
    }
    return config;
  },
  error => {
    // handle request error
    return Promise.reject(error);
  }
);

// export the axios instance for use in other modules
export default instance;
