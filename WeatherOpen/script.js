const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weather-info');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');


const apiKey = '0b40c8cc6a86008b5391008dad540d1b' ;

const updateBackground = (condition) => {
    const body = document.querySelector('body');
    switch (condition) {
        case 'Clear': // Sol
            body.style.backgroundImage = "url('assets/sun.svg')";
            break;
        case 'Rain': // Chuva
            body.style.backgroundImage = "url('assets/rain.svg')";
            break;
        default: // Condição default (nuvens ou neutro)
            body.style.backgroundImage = "url('assets/default.svg')";
            break;
    }
    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "repeat";
    body.style.backgroundPosition = "center";
};

// Função para buscar os dados do clima
const fetchWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
    const response = await fetch(url);
    
    if (!response.ok) {
        weatherInfo.innerHTML = `<p>Não foi possível encontrar o clima para a cidade informada.</p>`;
        return;
    }

    const data = await response.json();
    
   
    cityName.textContent = `Clima em ${data.name}`;
    temperature.textContent = `${data.main.temp}°C`;
    description.textContent = `Condição: ${data.weather[0].description}`;
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const weatherCondition = 'cloudy'; 
    const clouds = document.querySelector('.clouds');
    const sun = document.querySelector('.sun');
    const weatherStatus = document.getElementById('weather-status');

    if (weatherCondition === 'cloudy') {
        clouds.style.display = 'block';
        sun.style.display = 'none';
        weatherStatus.textContent = "Céu nublado";
    } else if (weatherCondition === 'sunny') {
        clouds.style.display = 'none';
        sun.style.display = 'block';
        weatherStatus.textContent = "Dia ensolarado";
    }
});
