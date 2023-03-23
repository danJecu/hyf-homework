const main = document.getElementById('main');
const websiteInput = document.getElementById('website');
const btnSubmit = document.getElementById('btn-submit');
const displayContainer = document.getElementById('display-data');

btnSubmit.addEventListener('click', async (e) => {
  e.preventDefault();
  const website = websiteInput.value;
  if (!website.length) {
    alert('Please enter a URL!');
  } else {
    postLink(website);
    websiteInput.value = '';
  }
  handleloadData();
});

handleloadData();

// Replaced the Website API with a simple POST of the link, due to reaching the max number of requests
/* async function fetchScreenshot(website) {
  try {
    const response = await fetch(
      `https://website-screenshot6.p.rapidapi.com/screenshot?url=${website}%2Fmarketplace&width=1920&height=1080&fullscreen=true`,
      options
    );
    const jsonResponse = await response.json();
    const payload = jsonResponse;
    const postResponse = await fetch(`${BASE_URL}`, {
      method: 'POST',
      body: JSON.stringify({
        payload,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log('Error posting data to API:', error);
  }
    { */
async function postLink(link) {
  try {
    const postResponse = await fetch(`${BASE_URL}`, {
      method: 'POST',
      body: JSON.stringify({
        link,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log('Error posting data to API:', error);
  }
}
async function handleDeleteItem(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    handleloadData();
  } catch (err) {
    console.log(err.statusText);
  }
}
async function handleloadData() {
  try {
    const response = await fetch(`${BASE_URL}`);
    const data = await response.json();
    if (data.length) {
      displayContainer.innerHTML = '';
      data.forEach((d) => {
        const div = document.createElement('div');
        const linkToPhoto = document.createElement('a');
        linkToPhoto.innerText = d.link;
        linkToPhoto.href = d.link;
        const deleteBtn = document.createElement('button');
        deleteBtn.addEventListener('click', async () => {
          handleDeleteItem(d['_id']);
        });
        deleteBtn.innerText = 'Delete';
        div.appendChild(linkToPhoto);
        div.appendChild(deleteBtn);
        displayContainer.appendChild(div);
      });
    } else {
      displayContainer.innerHTML = '<h1>No data to display</h1>';
    }
  } catch (err) {
    console.log(err.statusText);
  }
}

handleloadData();
