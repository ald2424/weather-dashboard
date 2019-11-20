// var cityName = [];
var APIKey = "26bf907883ee024cda544990d427d76a";


// This gets today's forecast
function getTodaysForcast(city){


var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=imperial&appid=" + APIKey;


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
    }


 // This gets the next 4 days forecast
function getFourDayForecast(city){

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&units=imperial&appid=" + APIKey;
    
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
        }

function rendercities(){
     $("#displayWeather").empty();

        var cityInput = $("#city-input").val().trim();
    
        // for (var i = 0; i < cityName.length; i++) {
            getTodaysForcast(cityInput);
            getFourDayForecast(cityInput);
            
    
    // }
    }
    
    
    $("#add-city").on("click", function(event) {
        event.preventDefault();
        // var input = $("#city-input").val().trim();
        // cityName.push(input);
        
        rendercities();
    });


    
