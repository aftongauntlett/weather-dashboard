$("#searchBar").on("click", function () {
    var userInput = $("#userInput").val()
    var cities = [userInput]
    // used JSON to get array of cities
    const currentCities = JSON.parse(localStorage.getItem("cities"));

    if (currentCities) {
        for (i = 0; i < currentCities.length; i++) {

            if (i < 6) {
                cities.push(currentCities[i])
            }
        }

    }

    localStorage.setItem("cities", JSON.stringify(cities))

    // created the function getweather to include the onclick cities and the user input cities together
    getWeather(userInput);
})


// created getweather function to run the API and pull specific data everytime a city is searched
function getWeather(cityName) {
    var APIKey = "2c10bee5201ad77237d10e6a96cc7389";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;
    // tried adding UV API, but could not get it working
    // var UV = "http://api.openweathermap.org/data/2.5/uvi/forecast?" + cityName + "appid=&lat=&lon=&cnt=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"

    })
        .then(function (response) {

            // use response.list to create a for loop for your 5 day forecast
            // combined city and date to have display side by side
            $(".cityDate").text(" " + response.city.name + " " + moment(response.list[0].dt_txt).format("(MMM Do, YYYY)"));
            $(".humidity").text("Humidity: " + response.list[0].main.humidity);
            // $(".uv").text("UV Index: " + );
            $(".wind").text("Wind Speed: " + response.list[0].wind.speed);
            // Converted the temp to fahrenheit
            // used math.round to get rid of the decimals in the fahrenheit 
            var tempF = Math.round((response.list[0].main.temp - 273.15) * 1.80 + 32);
            $(".tempF").text("Temperature: " + tempF + ("°"));

            var feelsLikeF = Math.round((response.list[0].main.feels_like - 273.15) * 1.80 + 32);
            $(".feelsLikeF").text("Feels like: " + feelsLikeF + "°");

            // created a for loop to generate 5 day weather data for user selected city. Had to go into the API to find when the days switched and went with 12pm every day. (which was every 8)
            var fiveDay = [
                response.list[3],
                response.list[11],
                response.list[19],
                response.list[27],
                response.list[35],
            ]

            var i;
            for (i = 0; i < fiveDay.length; i++) {

                var fiveDayTempF = Math.round((fiveDay[i].main.temp - 273.15) * 1.80 + 32);

                console.log(fiveDay[i]);
                $("#fiveDay" + (i + 1)).append('<p class="card-text">' + moment(fiveDay[i].dt_txt).format("MMM Do, YYYY") + '</p>')
                $("#fiveDay" + (i + 1)).append('<p class="card-text">' + "Temperature: " + fiveDayTempF + ("°"), '</p>')
                $("#fiveDay" + (i + 1)).append('<p class="card-text">' + "Humidity: " + fiveDay[i].main.humidity + '</p>')
                $("#fiveDay" + (i + 1)).append('<p class="card-text">' + fiveDay[i].main.icon + '</p>')


            }
        });

}

// prevent default to stop the form from going to the next page
$("form").submit(function (e) {
    e.preventDefault();
});

// created a function for what to happen when site is launched
const currentCities = JSON.parse(localStorage.getItem("cities"));
if (currentCities) {
    for (i = 0; i < currentCities.length; i++) {


        // console.log(currentCities[i])
        const currentCity = currentCities[i]

        // created buttons for locally stored cities
        $("#storedCities").append(' <button id="' + "city" + i + '" class="btn btn-sm ml-3">' + currentCity + '</button>');
        $("#city" + i).click(function () {
            getWeather(currentCity);

        });
    }

}