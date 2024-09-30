// ==== SEARCH SELCTOR
let searchInput = document.querySelector("#serachInput");
// ==== FIRST CARD
let firstDay = document.querySelector("#firstDay");
let firstNumber = document.querySelector("#firstNumber");
let firstMonth = document.querySelector("#firstMonth");
let cityName = document.querySelector("#cityName");
let temperature = document.querySelector("#temperature");
let imgWeather = document.querySelector("#imgWeather");
let caseWeather = document.querySelector("#caseWeather");
let umberella = document.querySelector("#umberella");
let wind = document.querySelector("#wind");
let compass = document.querySelector("#compass");
// ==== SECOND CARD
let secondDay = document.getElementsByClassName("secondDay");
let imgWeather2 = document.getElementsByClassName("imgWeather2");
let temperatureNight2 = document.getElementsByClassName("temperatureNight2");
let temperatureMorning2 = document.getElementsByClassName(
  "temperatureMorning2"
);
let caseWether2 = document.getElementsByClassName("caseWether2");

//========= GET DATA FROM API =========\\
async function getData(cityName) {
  let myHTTP = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${cityName}&days=3`
  );
  let wethearData = await myHTTP.json();
  return wethearData;
}

//========= DISPLAY DATA IN FIRTS CARD =========\\
function displayFirstCard(data) {
  let date = new Date();
  firstNumber.innerHTML = date.getDate();
  firstDay.innerHTML = date.toLocaleDateString("en-US", { weekday: "long" });
  firstMonth.innerHTML = date.toLocaleDateString("en-US", { month: "long" });
  cityName.innerHTML = data.location.name;
  temperature.innerHTML = data.current.temp_c;
  imgWeather.setAttribute("src", data.current.condition.icon);
  caseWeather.innerHTML = data.current.condition.text;
  umberella.innerHTML = data.current.humidity + " %";
  wind.innerHTML = data.current.wind_degree + " kh/m";
  compass.innerHTML = data.current.wind_dir;
}

//========= DISPLAY DATA IN ANUTHER CARD =========\\
function displayAnutherCard(data) {
  let castDay = data.forecast.forecastday;
  for (let i = 0; i < 2; i++) {
    let nextDate = new Date(castDay[i + 1].date);
    secondDay[i].innerHTML = nextDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    imgWeather2[i].setAttribute("src", castDay[i + 1].day.condition.icon);
    temperatureNight2[i].innerHTML = castDay[i + 1].day.maxtemp_c;
    temperatureMorning2[i].innerHTML = castDay[i + 1].day.mintemp_c;
    caseWether2[i].innerHTML = castDay[i + 1].day.condition.text;
  }
}

//======== START APP ========\\
async function startApp(cityName) {
  let wethearData = await getData(cityName);
  if (!wethearData.error) {
    displayFirstCard(wethearData);
    displayAnutherCard(wethearData);
  }
}

searchInput.addEventListener("keyup", function () {
  startApp(searchInput.value);
});

startApp("cairo");
