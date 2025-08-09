//VARIÁVEIS E SELEÇÃO DE ELEMENTOS

const apiKey = "b3f8141209c14678889213747250808";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const countryElement = document.querySelector("#country")
const localTimeElement = document.querySelector("#localTime");
const tempElement = document.querySelector("#temperature");
const condiElement = document.querySelector("#condition");
const sensElement = document.querySelector("#feelsLike");
const weatherIconElement = document.querySelector("#weather-icon");
const umidityElement = document.querySelector("#humidity");
const windElement = document.querySelector("#wind");
const pressureElement = document.querySelector("#pressure");
const visibilityElement = document.querySelector("#visibility");
const indElement = document.querySelector("#uv-index");

const weatherContainer = document.querySelector("#weather-result");

const errorMessageContainer = document.querySelector("#error-message");

const loader = document.querySelector("#loader");

//FUNÇÕES

const toggleLoader = () => {
  loader.classList.toggle("hidden");
};

const getWeatherData = async(city) => {
    toggleLoader();

    const apiweatherURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no&lang=pt`;

    const res = await fetch(apiweatherURL);
    const data = await res.json();

    toggleLoader();

    return data;
    //console.log(data); //=> testar e ver o nome das variáveis para exibi-lás
};

//MENSAGEM DE ERRO

const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hidden");
};

const hideInformation = () => {
  errorMessageContainer.classList.add("hidden");
  weatherContainer.classList.add("hidden");

};

const showWeatherData = async (city) => {

    hideInformation();

    const data = await getWeatherData(city);

     if (data.error) {
        showErrorMessage();
        return;
  }

    cityElement.innerText = `${data.location.name}, ${data.location.country}`;
    localTimeElement.innerText = data.location.localtime;
    tempElement.innerText = `${parseInt(data.current.temp_c)}°C`;
    condiElement.innerText = data.current.condition.text;
    weatherIconElement.setAttribute("src", `https:${data.current.condition.icon}`);
    umidityElement.innerText = `${data.current.humidity}%`;
    windElement.innerText = `${data.current.wind_kph}km/h`;
    pressureElement.innerText = `${data.current.pressure_mb} mb`;
    sensElement.innerText = data.current.feelslike_c;
    visibilityElement.innerText = `${data.current.vis_km} km`;
    indElement.innerText = data.current.uv;

    weatherContainer.classList.remove("hidden");
};

//EVENTOS
searchBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    const city = cityInput.value;

    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter"){
        const city = e.target.value;

        showWeatherData(city);
    }
});
