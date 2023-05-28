// RANDOM POST REQUEST TO KEEP SERVER UP
export const pingServer = async () => {
  try {
    await fetch('https://moviemood-back.onrender.com/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
        });
    console.log('Ping successful');
  } catch (error) {
    console.error('Ping failed', error.message);
  }
  setTimeout(pingServer, 300000);
};