API_KEY = 'vPyYMSx1rAQgABBmRB6ARGQC2dqrpmDn';
const container = document.getElementById('grid-container');
const inputWord = document.getElementById('search');
const inputLimit = document.getElementById('limit');

async function searchGif(searchWord, limitSearch = 5) {
    try {
        container.innerHTML = '';
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchWord}&limit=${limitSearch}`
        );
        const data = await response.json();

        return data.data;
    } catch (err) {
        console.log(err);
    }
}

function displayGif(results) {
    container.innerHTML = '';
    if (results.length > 0) {
        results.forEach(gif => {
            const img = document.createElement('img');
            const containerImg = document.createElement('div');
            containerImg.classList.add('container-img');
            img.src = gif.images.downsized.url;
            img.alt = gif.title;
            containerImg.style.height = gif.images.downsized.height + 'px';
            containerImg.style.width = gif.images.downsized.width + 'px';
            containerImg.appendChild(img);
            container.appendChild(containerImg);
        });
    } else {
        container.innerHTML = '<h3>No GIFs found</h3>';
    }
}

document.querySelectorAll('.search-element').forEach(input => {
    input.addEventListener('keyup', async () => {
        const searchWord = inputWord.value;
        const limitGifs = inputLimit.value;

        if (limitGifs === '') {
            const results = await searchGif(searchWord);
            displayGif(results);
        } else {
            const results = await searchGif(searchWord, limitGifs);
            displayGif(results);
        }
    });
});
