const weatherContainer = document.getElementById('weather-container');
const buttonSubmit = document.getElementById('submit');
const API_KEY = 'Insert API KEY here';

function calculateWindDirection(windDegrees) {
    if (windDegrees < 11.25 || windDegrees >= 348.75) {
        return 'N';
    } else if (windDegrees < 33.75) {
        return 'NNE';
    } else if (windDegrees < 56.25) {
        return 'NE';
    } else if (windDegrees < 78.25) {
        return 'ENE';
    } else if (windDegrees < 101.25) {
        return 'E';
    } else if (windDegrees < 123.75) {
        return 'ESE';
    } else if (windDegrees < 146.25) {
        return 'SE';
    } else if (windDegrees < 168.75) {
        return 'SSE';
    } else if (windDegrees < 191.25) {
        return 'S';
    } else if (windDegrees < 213.75) {
        return 'SSW';
    } else if (windDegrees < 236.25) {
        return 'SW';
    } else if (windDegrees < 258.75) {
        return 'WSW';
    } else if (windDegrees < 281.25) {
        return 'W';
    } else if (windDegrees < 303.75) {
        return 'WNW';
    } else if (windDegrees < 326.25) {
        return 'NW';
    } else {
        return 'NNW';
    }
}

function calculateSunTimes(sunRiseUnix, sunSetUnix, timeZone) {
    const sunRise = new Date(
        (sunRiseUnix + timeZone) * 1000
    ).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    });
    const sunSet = new Date((sunSetUnix + timeZone) * 1000).toLocaleTimeString(
        'en-US',
        { hour: 'numeric', minute: 'numeric', hour12: false }
    );

    const sunTimes = `<div class="sun-times"><i class="fa-sharp fa-solid fa-sun"></i> ${sunRise}-${sunSet} <i class="fa-sharp fa-solid fa-moon"></i></div>`;

    return sunTimes;
}

function getGeoLocation() {
    // Getting user's location
    navigator.geolocation.getCurrentPosition(async function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const weather = await getWeather(latitude, longitude);

        buildUI(weather);
    });
}

getGeoLocation();

function buildUI(weather) {
    // Building UI
    // Top part of the container

    const weatherDescription = `<div class="weather-description"><img alt="icon" src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" width="60" height="60" /><h4>${weather.weather[0].description}</h4></div>`;

    const locationTemperature = `
          <h2>${Math.round(weather.main.temp - 273.15)}° C</h2>`;

    const weatherMinMax = `
          <h6>L:${Math.round(weather.main.temp_min - 273.15)}° - H:${Math.round(
        weather.main.temp_max - 273.15
    )}°</h6>`;

    const weatherCardTop = `<div class="weather-card-top">${weatherDescription}${locationTemperature}${weatherMinMax}</div>`;

    // Middle part of the container
    const locationTitle = `
         <div class="location-title" <h1>${weather.name}</h1></div>`;

    // Bottom part of the container
    const feelLikeTemperature = `
          <p>Feels like ${Math.round(weather.main.feels_like - 273.15)}°</p>`;

    const windDirection = calculateWindDirection(weather.wind.deg);
    const windCondition = `<div class="wind-condition">${weather.wind.speed}m/s <i class="fa-solid fa-wind"></i> ${windDirection}</div>`;

    const sunTimes = calculateSunTimes(
        weather.sys.sunrise,
        weather.sys.sunset,
        weather.timezone
    );

    const weatherCardBottom = `<div class="weather-card-bottom">${windCondition}${feelLikeTemperature}${sunTimes}</div> `;

    weatherContainer.innerHTML = `${weatherCardTop}${locationTitle}${weatherCardBottom}`;

    if (Math.round(weather.main.temp - 273.15) > 20) {
        weatherContainer.style.backgroundColor = '#FFE53B';
        weatherContainer.style.backgroundImage =
            'linear-gradient(180deg, #FFE53B 0%, #FF2525 74%)';
    } else if (Math.round(weather.main.temp - 273.15) > 10) {
        weatherContainer.style.backgroundColor = '#FBAB7E';
        weatherContainer.style.backgroundImage =
            'linear-gradient(180deg, #FBAB7E 0%, #F7CE68 100%)';
    } else if (Math.round(weather.main.temp - 273.15) < 7) {
        weatherContainer.style.backgroundColor = '#0093E9';
        weatherContainer.style.backgroundImage =
            'linear-gradient(180deg, #0093E9 0%, #80D0C7 100%)';
    }
}

async function getWeatherFromLocation() {
    const locationInput = document.getElementById('location').value;

    try {
        const locationResponse = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${locationInput}&limit=5&appid=${API_KEY}`
        );

        if (!locationResponse.ok) {
            throw new Error('Location API request failed');
        }

        const locationData = await locationResponse.json();
        const location = locationData[0];

        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`
        );

        if (!weatherResponse.ok) {
            throw new Error('Weather API request failed');
        }

        const weatherData = await weatherResponse.json();
        console.log(weatherData);
        return weatherData;
    } catch (error) {
        console.error('Error getting weather data:', error);
        throw error;
    }
}

document
    .getElementById('location')
    .addEventListener('keypress', async function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            buttonSubmit.click();
            try {
                const weather = await getWeatherFromLocation();

                buildUI(weather);

                document.getElementById('location').value = '';
            } catch (error) {
                alert('Please try a valid location!');
            }
        }
    });
