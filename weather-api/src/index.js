import _ from "lodash";
//import dotenv from "dotenv-webpack";
import cities from "./city.list.json";
const api_path = "https://api.openweathermap.org/data/2.5/weather?q=";

let city;
let country;
const appid = process.env.API_KEY;
const units = "metric";

function runFetch() {
  fetch(`${api_path}${city},${country}&units=${units}&appid=${appid}`)
    .then((response) => response.json()) //actual response in JSON
    .then((resBody) => displayWeatherData(resBody)); //body of the response
}

function displayWeatherData(resBody) {
  let icon = resBody["weather"][0]["icon"];
  let icon_path = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  let html = `
    <h2>${city}, ${country}</h2>
    <img src=${icon_path} id="weather-icon"></img>
    <p> <strong> Temperature:</strong> ${resBody.main["temp"]}°C</p>
    <p> <strong> Description:</strong> ${resBody["weather"][0]["description"]}</p>`;

  let weatherDiv = document.getElementById("weather-result-div");
  weatherDiv.innerHTML = html;
}
function findCountries(cityName) {
  console.log("findCountries");
  let countries = [];
  let info = [];
  let citiesLength = cities.length;
  for (let index = 0; index < citiesLength; index++) {
    if (cities[index]["name"] === cityName) {
      countries.push(cities[index]["country"]);
      info.push(cities[index]);
    }
  }
  console.log(info);

  let select = document.getElementById("countries-dropdown");

  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }

  for (let index = 0; index < countries.length; index++) {
    let option = document.createElement("option");
    option.textContent = countries[index];
    option.value = countries[index];
    select.appendChild(option);
  }
}
function onCitySubmit() {
  city = document.getElementById("city-name").value;
  findCountries(city);
}
let submitCity = document.getElementById("submit-city");
submitCity.addEventListener("click", onCitySubmit);

function onCountrySubmit() {
  country = document.getElementById("countries-dropdown").value;
  runFetch();
}
let submitCountry = document.getElementById("submit-country");
submitCountry.addEventListener("click", onCountrySubmit);
