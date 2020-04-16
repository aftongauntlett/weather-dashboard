$("#searchBar").on("click", function () {
    var userInput = $("#userInput").val()

    // created the function getweather to include the onclick cities and the user input cities together
    getWeather(userInput);
})

function getWeather(cityName) {
    var APIKey = "2c10bee5201ad77237d10e6a96cc7389";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;

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

            // created a for loop to generate 5 day weather data for user selected city 

            var i;
            for (i = 0; i < fiveDayOne.length; i++) {
                text += fiveDayOne.children[i] + "<br>";

                // $("p").children().

            }


        });

}

// calling the getweather function for each onclick city 

$("#chantilly").click(function () {
    getWeather("Chantilly");
});

$("#fairfax").click(function () {
    getWeather("Fairfax");
});

$("#reston").click(function () {
    getWeather("Reston");
});

$("#herndon").click(function () {
    getWeather("Herndon");
});

// prevent default to stop the form from going to the next page
$("form").submit(function (e) {
    e.preventDefault();
});