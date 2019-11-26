var cityName = [];
var APIKey = "26bf907883ee024cda544990d427d76a";

init();

// This gets today's forecast
function getTodaysForcast(city){


var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=imperial&appid=" + APIKey;


$.ajax({
    url: weatherURL,
    method: "GET"
})
        .then(function(response) {
            
            var makeImg = $("<img class='wIcon floatLeft' src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='Weather Icon'>");
                            
             var city = response.name;
             var todayForecast = Math.trunc(response.main.temp);
             var todayDesc = response.weather[0].description;
             var todayWind = response.wind.speed;
             var todayHumidity = response.main.humidity;
             
                 
                 var day = $("<div>")
                    day.append("<h1>" + city + "'s Forecast" + "</h1>"
                                + "<h2 class='floatLeft'>" + "Today" + "</h2>");
                        day.append(makeImg);
                        day.append(  "<div class='clear'>" + 
                              "<br>" +
                              "Temperature: " + todayForecast + "F" + "<br>" +                          
                              todayDesc + "<br> " +
                              "Wind Speed: " + todayWind + "MPH " + "<br>" +
                              "Humidity: " + todayHumidity + "% " + "</div>"
                        );
                        
                        $("#todaysForecast").append(day);
                    
        });
}

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
    var sixthDay = moment().add(5, 'days').format('ddd');
    days.push(sixthDay);

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&units=imperial&appid=" + APIKey;
    
    $.ajax({
        url: forecastURL,
        method: "GET"
    })
            .then(function(response) {
                  
                
            // Loops through the entire response array
                for(var i = 0; i < response.list.length; i++){
                    for(var x = 0; x < days.length; x++){
                    // Pulls out 12:00 forecast for days 2 - 4 and assigns the day of the week
                         if((i == 6 && x == 0)||
                            (i == 14 && x == 1) ||
                            (i == 22 && x == 2) ||
                            (i == 30 && x ==3) ||
                            (i == 38 && x == 4)){
                            
                             var makeImg = $("<img class='wIcon onTop' src='http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png' alt='Weather Icon'>");
                             var date = days[x];
                             var forecast = Math.trunc(response.list[i].main.temp);
                             var wind = response.list[i].wind.speed;
                             var humidity = response.list[i].main.humidity;
                             var desc = response.list[i].weather[0].description;
    
                                var day = $("<span class='col-lg-2 next'>")
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

// This function takes the user's input and retrieves the data from the weather api as well as push the input into the array declared at the top of this page
function rendercities(){
     $("#displayWeather").empty();
     $("#todaysForecast").empty();

        var cityInput = $("#city-input").val().trim();
    
            getTodaysForcast(cityInput);
            getFourDayForecast(cityInput);  

// Checks to see if the city entered already exists in the cityName array. If so, it does not add it again
            if (cityName.includes(cityInput)){
                return;
            }
            else{
                 cityName.push(cityInput);
            }
            storeCities();
            cityHistory();       
}
    
    
    $("#add-city").on("click", function(event) {
        event.preventDefault();
        event.stopPropagation()
        rendercities();
        storeCities();
    });

function storeCities(){
        localStorage.setItem("cityName", JSON.stringify(cityName));
}

// This function creates buttons to create a history of recently searched cities
 function cityHistory() {
        $("#searchHistory").empty();
         for (var i = 0; i < cityName.length; i++) {
             var city = cityName[i];
             var li = $("<li class='styleList'>");
                 li.css("list-style-type", "none");
             var button = $("<button class='btn btn-link'>" + city + "</button>");
                 li.append(button);
            $("#searchHistory").append(li);
          
        }
}
// Displays the buttons for all recently searched cities
function init() {
        var storedCities = JSON.parse(localStorage.getItem("cityName"));
        if (storedCities !== null) {
          cityName = storedCities;
        }
        cityHistory()
}

// Checks to see if a button was clicked, if so, it takes the text of the button and displays the weather for that city
$( "li" ).click(function( event ) {
        event.preventDefault()
        event.stopPropagation()
        
        var target = $( event.target );
            if ( target.is( "button" ) ) {
                $("#displayWeather").empty(); 
                $("#todaysForecast").empty();  
                    
                var searchedCity = $(event.target).text()
                    getTodaysForcast(searchedCity);
                    getFourDayForecast(searchedCity);
             
            }
});