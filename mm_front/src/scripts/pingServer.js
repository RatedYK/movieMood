const axios = require('axios');

// RANDOM POST REQUEST TO KEEP SERVER UP
export const pingServer = async () => {
  try {
    await axios.post('https://moviemood-back.onrender.com/movies');
    console.log('Ping successful');
  } catch (error) {
    console.error('Ping failed', error.message);
  }
};