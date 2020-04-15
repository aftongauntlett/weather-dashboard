$("#searchBar").on("click", function () {
    var userInput = $("#userInput").val()

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

            // Transfer content to HTML

            $(".date").text("" + response.list[0].dt_txt);
            $(".city").text("" + response.city.name);
            $(".feelsLike").text("Feels like: " + response.list[0].main.feels_like);
            $(".humidity").text("Humidity: " + response.list[0].main.humidity);
            // $(".uv").text("UV Index: " + );
            // $("icon").text("" + response.weather.icon);


            // Convert the temp to fahrenheit
            var tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
            $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
        });

}


$("#chantilly").click(function () {
    getWeather("Chantilly");

});



$("form").submit(function (e) {
    e.preventDefault();
});