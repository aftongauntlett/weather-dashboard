$(document).ready(function () {

    $("#searchBar").on("click", function () {
        var userInput = $("#userInput").val()
        var APIKey = "2c10bee5201ad77237d10e6a96cc7389";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
            "q=" + userInput + "&appid=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"

        })

            .then(function (response) {
                console.log(queryURL);
                console.log(response);

                // Transfer content to HTML
                $(".city").html("<h1>" + response.name + " Weather Details</h1>");
                $(".wind").text("Wind Speed: " + response.wind.speed);
                $(".humidity").text("Humidity: " + response.main.humidity);

                // Convert the temp to fahrenheit
                var tempF = (response.main.temp - 273.15) * 1.80 + 32;

                // add temp content to html
                $(".temp").text("Temperature (K) " + response.main.temp);
                $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

                // Log the data in the console as well
                console.log("Wind Speed: " + response.wind.speed);
                console.log("Humidity: " + response.main.humidity);
                console.log("Temperature (F): " + tempF);
            });

    })

    $("form").submit(function (e) {
        e.preventDefault();
    });
}); 