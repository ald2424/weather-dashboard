// *******************TO DO*********************
// Get UV index working. It needs to work by pulling the coordinates out of the weatherURL API. Right now it returns [Object, Object] or bad request depending on where I run the function

// Store user input into local storage. 
// Upon opening the browser, the user should be able to click a button that says "Show History" and all recently searched cities will appear
// From there, the user should be able to click on a recently searched city to see forecast

// Add CSS 

// bands-in-town, nyt-example, working-movie-app




// var cityName = [];
var APIKey = "26bf907883ee024cda544990d427d76a";
// var nLong;
// var nLat;


// This gets today's forecast
function getTodaysForcast(city){


var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=imperial&appid=" + APIKey;


$.ajax({
    url: weatherURL,
    method: "GET"
})
        .then(function(response) {
            console.log(response);
            var makeImg = $("<img class='wIcon onTop' src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='Weather Icon'>");
                            
                            
             var long = response.coord.lon;
             nLong = JSON.stringify(long)
             var lat = response.coord.lat;
             nLat = JSON.stringify(lat);
             var city = response.name;
             var todayForecast = response.main.temp;
             var todayDesc = response.weather[0].description;
             var todayWind = response.wind.speed;
             var todayHumidity = response.main.humidity;
             var newLine = $("<br>");
             
                 
                 var day = $("<div class='col-sm-2 next'>")
                    day.append("Today");
                    day.append(makeImg);
                        day.append(  
                              todayForecast + "<br>" +                          
                              todayDesc + "<br> " +
                              "Wind Speed: " + todayWind + "MPH " + "<br>" +
                              "Humidity: " + todayHumidity + "% "
                        );
                        
                        $("#displayWeather").append(day);

                        // uvIndex(nLat, nLong); 
                    
        });
}
// function uvIndex(lat, long){

//         var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + long;

//                             $.ajax({
//                                 url: uvUrl,
//                                 method: "GET"
//                             })
//                             .then(function(response){
//                                 console.log("UV Index: " + response);
//                             })
    
//                         }

 // This gets the next 4 days forecast
function getFourDayForecast(city){
    
    // The array and the variables are used to add the day of the week to the forecast
    var days = [];
    var tom = moment().add(1, 'days').format('ddd');
    days.push(tom);
    var thirdDay = moment().add(2, 'days').format('ddd');
    days.push(thirdDay);
    var fourthDay = moment().add(3, 'days').format('ddd');
    days.push(fourthDay);
    var fifthDay = moment().add(4, 'days').format('ddd');
    days.push(fifthDay);

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&units=imperial&appid=" + APIKey;
    
    $.ajax({
        url: forecastURL,
        method: "GET"
    })
            // We store all of the retrieved data inside of an object called "response"
            .then(function(response) {
                
                
            // Loops through the entire response array
                for(var i = 0; i < response.list.length; i++){
                    for(var x = 0; x < days.length; x++){
                    // Pulls out 12:00 forecast for days 2 - 4 and assigns the day of the week
                         if((i == 6 && x == 0)||
                            (i == 14 && x == 1) ||
                            (i == 22 && x == 2) ||
                            (i == 30 && x ==3)){
                            
                             var makeImg = $("<img class='wIcon onTop' src='http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png' alt='Weather Icon'>");
                             var date = days[x];
                             var forecast = response.list[i].main.temp;
                             var wind = response.list[i].wind.speed;
                             var humidity = response.list[i].main.humidity;
                             var desc = response.list[i].weather[0].description;
    
                                var day = $("<div class='col-sm-2 next'>")
                                    day.append(date + "<br> ");
                                    day.append(makeImg);
                                    day.append( 
                                        forecast + "F " +
                                        "<br> " + desc + "<br> " +
                                        "Wind Speed: " +  wind + "MPH " + "<br>" +
                                        "Humidity: " + humidity + "% ");
                                        
                                         $("#displayWeather").append(day);
                                         
                            }
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
