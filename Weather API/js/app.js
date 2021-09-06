APIKEY = "ea8837df503db1cc47357bc3289f366e"

document.addEventListener("DOMContentLoaded", init);



function init() {
	
  document.getElementById("btnEnter").addEventListener("click", ev => {
    ev.preventDefault(); //to stop the page reload
    $(".section.results").show();
    let str = document.getElementById("search").value.trim();
    let url = "http://api.openweathermap.org/data/2.5/weather?q="+str+"&appid="+ APIKEY +"&units=metric";
    //url = url.concat(str);
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(content => {
        //  data, pagination, meta
        console.log(content.main.temp);
        
        let tempLow = document.querySelector("#temp-low");
        let tempHigh = document.querySelector("#temp-high");
        tempLow.textContent = content.main.temp_min + "°C";
        tempHigh.textContent = content.main.temp_max + "°C";
        

        let weather = document.querySelector("#weather");
        weather.textContent = content.weather[0].description;

        let location = document.querySelector("#location h1");
        location.textContent = content.name;

        let feelsLike = document.querySelector("#feels-like");
        feelsLike.textContent = "feels like " + content.main.feels_like + "°C";

        let humidity = document.querySelector("#humidity");
        humidity.textContent = "humidity: "+content.main.humidity;
      })
      .catch(err => {
        console.error(err);
      }); 
  });

}