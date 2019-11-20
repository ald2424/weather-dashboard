var cityName = "Charlotte";
var APIKey = "26bf907883ee024cda544990d427d76a";
var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&units=imperial&appid=" + APIKey;
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ cityName +"&units=imperial&appid=" + APIKey;

// This gets today's forecast
$.ajax({
    url: weatherURL,
    method: "GET"
})
        .then(function(response) {
            console.log(response);
             var city = response.name;
             var todayForecast = response.main.temp;
             var todayWind = response.wind.speed;
             var todayHumidity = response.main.humidity;
             
             $("#displayWeather").append("City: " + city+ "<br>");
             var day = $("<div>")

                day.append( 
                    "Today's Forecast: " + todayForecast + " " +
                    "Wind Speed: " + todayWind + "MPH " +
                    "Humidity: " + todayHumidity + "% "
                    );
                $("#displayWeather").append(day);
                    
            });


// This gets the next 4 days forecast
$.ajax({
    url: forecastURL,
    method: "GET"
})
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
            console.log(forecastURL);
          
            
        // Loops through the entire response array
            for(var i = 0; i < response.list.length; i++){
                // Pulls out 12:00 forecast for days 2 - 4
                if(i == 6 ||
                    i == 14 ||
                    i == 22 ||
                    i == 30){
                var date = response.list[i].dt_txt;
                var forecast = response.list[i].main.temp;
                var wind = response.list[i].wind.speed;
                var humidity = response.list[i].main.humidity;

                var day = $("<div>")

                day.append( 
                    "Date: " + date + " " +
                    "Forecast: " + forecast + "F " +
                    "Wind Speed: " +  wind + "MPH " +
                    "Humidity: " + humidity + "% ");
                $("#displayWeather").append(day);
                    }
            }
        });