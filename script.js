$("#searchBar").on("click", function () {
    var userInput = $("#userInput").val()
    var APIKey = "2c10bee5201ad77237d10e6a96cc7389";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=" + APIKey;


    $.ajax({
        url: queryURL,
        method: "GET"

    })
        .then(function (response) {


            // Transfer content to HTML

            $(".city").text("City" + response.city.name);
            // $(".firstDate").text("Date:" + response.date);
            // $(".temp").text("Temp: " + response.temp);
            // $(".humidity").text("Humidity: " + response.main.humidity);

            // // Convert the temp to fahrenheit
            // var tempF = (response.main.temp - 273.15) * 1.80 + 32;

            // // add temp content to html
            // $(".temp").text("Temperature (K) " + response.main.temp);
            // $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

        });

})

$("form").submit(function (e) {
    e.preventDefault();
});


