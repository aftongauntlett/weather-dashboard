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


    $.ajax({
        url: queryURL,
        method: "GET"

    })
        .then(function (response) {

            var UV = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon + "&cnt=";

            $.ajax({
                url: UV,
                method: "GET"
            })
                .then(function (UVIndex) {
                    $(".uv").text("UV Index: " + UVIndex.value);
                    console.log(UVIndex)

                    if (UVIndex.value < 3) {
                        $(".uv").css("background-color", "#87e89c", "margin-right", "700px")
                        $(".uv").css("margin-right", "700px")
                    }

                    else if (UVIndex.value > 8) {
                        $(".uv").css("background-color", "#eb7a59", "margin-right", "700px")
                        $(".uv").css("margin-right", "700px")
                    }

                    else {
                        $(".uv").css("background-color", "#edd080", "margin-right", "700px")
                        $(".uv").css("margin-right", "700px")
                    }

                })

            // use response.list to create a for loop for your 5 day forecast
            // combined city and date to have display side by side
            $(".cityDate").text(" " + response.city.name + " " + moment(response.list[0].dt_txt).format("(MMM Do, YYYY)"));
            $(".humidity").text("Humidity: " + response.list[0].main.humidity + " %");
            $(".wind").text("Wind Speed: " + response.list[0].wind.speed + (" MPH"));

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
                $("#fiveDay" + (i + 1)).empty();


                var fiveDayTempF = Math.round((fiveDay[i].main.temp - 273.15) * 1.80 + 32);

                console.log(fiveDay[i]);
                $("#fiveDay" + (i + 1)).append('<p class="card-text fiveDate">' + moment(fiveDay[i].dt_txt).format("MMM Do, YYYY") + '</p>')
                $("#fiveDay" + (i + 1)).append('<p class="card-text">' + ("<img src='http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'>"), + '</p>')
                $("#fiveDay" + (i + 1)).append('<p class="card-text">' + "Temperature: " + fiveDayTempF + ("°"), '</p>')
                $("#fiveDay" + (i + 1)).append('<p class="card-text">' + "Humidity: " + fiveDay[i].main.humidity + (" %"), '</p>')

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

        // created buttons for locally stored cities, creates a new button for each city up to 6
        $("#storedCities").append(' <button id="' + "city" + i + '" class="city-button btn btn-sm ml-3 col-5">' + currentCity + '</button>');
        $("#city" + i).click(function () {
            getWeather(currentCity);

        });
    }

}

// pull the first array in the previously searched city info from local storage when browser is opened, if no stored data - use the default "chantilly"

var previousCity = JSON.parse(localStorage.getItem("cities"));
if (!previousCity) {
    previousCity = "Chantilly"
}
else {
    previousCity = previousCity[0]
}

getWeather(previousCity);

