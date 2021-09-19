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

  let localUrl = "https://api.openweathermap.org/data/2.5/weather?APPID=ea8837df503db1cc47357bc3289f366e&lat="+ latitude +"&lon="+ longitude +""

  fetch(localUrl)
    .then(response => response.json())
    .then(content => {
      
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

function RefreshApi(UnitAppend = "°C") {
  //ev.preventDefault(); //to stop the page reload
  let str = document.getElementById("search").value.trim();
  $(".section.results").show();
  let url = "https://api.openweathermap.org/data/2.5/weather?q="+str+"&appid="+ APIKEY +"&units=" + units;
  Forecast(units, UnitAppend);

  fetch(url)
    .then(response => response.json())
    .then(content => {
      
      let tempLow = document.querySelector("#temp-low");
      let tempHigh = document.querySelector("#temp-high");
      tempLow.textContent = Math.trunc(content.main.temp_min) + UnitAppend;
      tempHigh.textContent = Math.trunc(content.main.temp_max) + UnitAppend;
      

      let weather = document.querySelector("#weather");
      weather.textContent = content.weather[0].main;

      let location = document.querySelector("#location h1 p");
      location.textContent = content.name;

      let feelsLike = document.querySelector("#feels-like");
      feelsLike.textContent = "feels like " + Math.trunc(content.main.feels_like) + UnitAppend;

      let humidity = document.querySelector("#humidity");
      humidity.textContent = "humidity: "+content.main.humidity + "%";

      let icon = document.querySelector("#icon");
      icon.src = "http://openweathermap.org/img/wn/"+ content.weather[0].icon + ".png";
      document.querySelector("#location h1").appendChild(icon); 

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
      RefreshApi("°C")
      Forecast(units, "°C")
      break;
    case "°F":
      units = "imperial"
      RefreshApi("°F")
      Forecast(units, "°F")
      break;
    case "°K":
      units = "standard"
      RefreshApi("°K")
      Forecast(units, "°K")
      break;
  }
});


function Forecast(units = "metric", UnitAppend = "°C") {
  let str = document.getElementById("search").value.trim();
  let ForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+str+"&appid="+ APIKEY +"&units=" + units;
  fetch(ForecastUrl)
    .then(response => response.json())
    .then(content => {

      var forecastArea = document.querySelector(".section.forecast .container .row")
      var forecastToday = document.querySelector(".section.today .container .row")
      forecastArea.innerHTML = ''
      forecastToday.innerHTML = ''
      
      for (let index = 0; index < 4; index = index + 1) {

        let timeStamp = content.list[index].dt;

        let date = new Date(timeStamp*1000);

        // Month
        var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var month =  months_arr[date.getMonth()];

        // Day
        var day = date.getDate();

        var hour = date.getHours();

        if (hour < 10) {
          hour = '0' + hour
        }

        let temp = Math.trunc(content.list[index].main.temp);
        let weather = content.list[index].weather[0].main;

        let icon = "http://openweathermap.org/img/wn/"+ content.list[index].weather[0].icon + ".png";


        

        
        var newDay = document.createElement("div")
        newDay.className = "col-md text-center"
        newDay.innerHTML = '<p>'+ temp + UnitAppend +'</p><img src='+ icon +'><hr><p>'+ weather +'</p><p><b>'+ hour +':00</b></p>'
        forecastToday.appendChild(newDay)
      }
      

      for (let index = 8; index < 40; index = index + 8) {

        let timeStamp = content.list[index].dt;

        let date = new Date(timeStamp*1000);

        // Month
        var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var month =  months_arr[date.getMonth()];

        // Day
        var day = date.getDate();

        let temp = Math.trunc(content.list[index].main.temp);
        let weather = content.list[index].weather[0].main;
        let dateText = content.list[index].dt_txt;

        let icon = "http://openweathermap.org/img/wn/"+ content.list[index].weather[0].icon + ".png";


        

        
        var newDay = document.createElement("div")
        newDay.className = "col-md text-center"
        newDay.innerHTML = '<p>'+ temp + UnitAppend +'</p><img src='+ icon +'><hr><p>'+ weather +'</p><p><b>'+ day +' '+ month +'</b></p>'
        forecastArea.appendChild(newDay)
      }

    })
    .catch(err => {
      console.error(err);
    }); 
}
