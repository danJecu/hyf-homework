const container = document.getElementById('container');
const listScreenshots = ['123', '567'];

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'website-screenshot6.p.rapidapi.com',
  },
};

const website = 'https://hobbii.com';

fetch(
  `https://website-screenshot6.p.rapidapi.com/screenshot?url=${website}&width=1920&height=1080&fullscreen=true`,
  options
)
  .then((response) => response.json())
  .then((response) => {
    const img = document.createElement('img');
    img.src = response.screenshotUrl;
    console.log(response.screenshotUrl);
  })
  .catch((err) => console.error(err));
