# weather-dashboard
This website allows the user to type in a city and see the current forecast as well as a five day forecast.
The information provided includes an icon of the weather, the temperature, a description of the weather, wind speed, and humidity.
![Web_Page_OnLoad](/assets//webpagloaded.png?raw=true "Web Page")
Once the user has entered a city, it stores the city in local storage and a button appears on the webpage that allows the user to easily click the button to check the forecast for recently searched cities.
![Web_Page_OnLoad](/assets/images/EnteredFirstCity.png?raw=true "Showing History")
![Web_Page_OnLoad](/assets/images/EnteredSecondCity.png?raw=true "Showing History")

This webpage uses OpenWeatherMap API to find the current forecast and the five day forecast.

I also incorperated Moment.js to show the name of the day of the week on the five day forecast.

One challenge that I faced while creating this application was the five-day forecast spans would occationally shift. I was able to fix this by making the parent div's position fixed.

I also realized that when the user types in a city into the search bar that already exsists in the recent history it would add the city again. I fixed this issue by using an if statement before pushing the city name into the array to check to see if it already exsists.

I was not able to get my function working to display the UV index.  I tried using the current forecast API to get the longitude and latitude of the city entered and using that to find the UV index.  However, after several attempts of getting my function to work, I had to take that portion of code out. 
