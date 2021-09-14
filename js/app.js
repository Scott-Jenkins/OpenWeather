APIKEY = "ea8837df503db1cc47357bc3289f366e"
let units = "metric"


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude

  let localUrl = "http://api.openweathermap.org/data/2.5/weather?APPID=ea8837df503db1cc47357bc3289f366e&lat="+ latitude +"&lon="+ longitude +""
  console.log(localUrl)

  fetch(localUrl)
    .then(response => response.json())
    .then(content => {
      
      console.log(content.name);
      document.getElementById("search").value = content.name;
      RefreshApi();
      Forecast()
    })
    .catch(err => {
      console.error(err);
    }); 
    
}

getLocation()


RunApi()
function RunApi() {
  document.getElementById("btnEnter").addEventListener("click", ev => {
    RefreshApi()
    
    
  });
}

function RefreshApi() {
  //ev.preventDefault(); //to stop the page reload
  let str = document.getElementById("search").value.trim();
  $(".section.results").show();
  let url = "https://api.openweathermap.org/data/2.5/weather?q="+str+"&appid="+ APIKEY +"&units=" + units;
  console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(content => {
      
      let tempLow = document.querySelector("#temp-low");
      let tempHigh = document.querySelector("#temp-high");
      tempLow.textContent = Math.trunc(content.main.temp_min) + "°C";
      tempHigh.textContent = Math.trunc(content.main.temp_max) + "°C";
      

      let weather = document.querySelector("#weather");
      weather.textContent = content.weather[0].main;

      let location = document.querySelector("#location h1 p");
      location.textContent = content.name;

      let feelsLike = document.querySelector("#feels-like");
      feelsLike.textContent = "feels like " + Math.trunc(content.main.feels_like) + "°C";

      let humidity = document.querySelector("#humidity");
      humidity.textContent = "humidity: "+content.main.humidity + "%";

      let icon = document.querySelector("#icon");
      icon.src = "http://openweathermap.org/img/wn/"+ content.weather[0].icon + ".png";
      document.querySelector("#location h1").appendChild(icon); 

      //----------------------Sunset Sunrise-----------------------------

      //let sunrise_timestamp = content.sys.sunrise;
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      //var sunrise_date = new sunrise_date(sunrise_timestamp * 1000);
      // Hours part from the timestamp
      //var sunrise_hours = sunrise_Date.getHours();
      // Minutes part from the timestamp
      //var sunrise_minutes = "0" + sunrise_date.getMinutes();
      // Seconds part from the timestamp
      //var sunrise_seconds = "0" + sunrise_date.getSeconds();

      // Will display time in 10:30:23 format
      //var sunrise_formattedTime = sunrise_hours + ':' + sunrise_minutes.substr(-2) + ':' + sunrise_seconds.substr(-2);

      //let sunrise = document.querySelector("#sunrise");
      //sunrise.textContent = sunrise_formattedTime;

      

      //let sunset = document.querySelector("#sunset");
      //sunset.textContent = content.sys.sunset;

      //---------------------Change Background-------------------------
      switch (weather.textContent) {
        case "Clouds":

          $("#overlay").css({
          "transition": "1s",
          "background-color": "rgb(146 177 173 / 52%)",});
          break;

        case "Clear":
          
          $("#overlay").css({
          "transition": "1s",
          "background-color": "rgba(255, 179, 80, 0.521)",});
          break;

        case "Snow":
          
          $("#overlay").css({
          "transition": "1s",
          "background-color": "rgb(243 255 253 / 52%)",});
          break;

        case "Rain":
          
          $("#overlay").css({
          "transition": "1s",
          "background-color": "rgb(95 129 255 / 52%)",});
          break;
      }
      
    })
    .catch(err => {
      console.error(err);
    }); 
}

document.querySelector("#dropdownMenuButton").addEventListener("click", ev => {
  let unitsValue = document.querySelector("#dropdownMenuButton").value;

  switch (unitsValue) {
    case "°C":
      units = "metric"
      RefreshApi()
      break;
    case "°F":
      units = "imperial"
      RefreshApi()
      break;
    case "°K":
      units = "standard"
      RefreshApi()
      break;
  }
});


function Forecast() {
  let str = document.getElementById("search").value.trim();
  let ForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+str+"&appid="+ APIKEY +"&units=" + units;
  console.log(ForecastUrl)
  fetch(ForecastUrl)
    .then(response => response.json())
    .then(content => {
      /*
      let getWeatherDate = content.list[0].dt

      getDate = getDate * 1000
      console.log(getDate);
      let newDate = getDate.();
      console.log(newDate);
      */
      let weatherTimestamp = content.list[0].dt;

      var getWeatherDate = weatherTimestamp * 1000;

      var getWeatherDate_hours = getWeatherDate.getHours();

      var getWeatherDate_minutes = "0" + getWeatherDate.getMinutes();

      var getWeatherDate_seconds = "0" + getWeatherDate.getSeconds();
    })
    .catch(err => {
      console.error(err);
    }); 
}
