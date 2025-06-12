import axios from 'axios';

// Set global timeout for all requests
axios.defaults.timeout = 20000; // 8 seconds

export default axios;
