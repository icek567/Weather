
// if (localStorage.getItem("searchhistory")) {
//     searchHistoryArray = JSON.parse(localStorage.getItem("searchhistory"))
// }
// else {
//     searchHistoryArray = []
// }
// if (localStorage.getItem("storedHTML")) {
//     $("#info").html(localStorage.getItem("storedHTML"))
// }



// for (i of searchHistoryArray) {
//     var searchItemDiv = $("<div>").text(i).addClass("searchhistoryitem")
//     city.append(searchItemDiv)
// }




// ajax calls that will show up on the console also pull the information from OpenWeatherMap
$("#submitCity").on("click", function () {
    var city = $(".input").val();
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=dc3b26ac9a18483a9000884d9ebbbe65"
    var setDate = moment().format('L');
    $.ajax({
        url: weatherUrl,
        method: "GET",

    }).then(function (response) {
        console.log(weatherUrl);
        console.log(response)
        $("#current").empty();
        var Temperature = Math.round(response.main.temp);

       var city1 = $("<h1>").text( response.name + "  " + setDate );
       var wind1 = $("<p>").text("Windspeed: " + response.wind.speed + " MPH");
        var humid1 = $("<p>").text("Humidity: " + response.main.humidity + "%");
        var temp1 =$("<p>").text("Temperature: " + Temperature +  "°F");
        var longitude = response.coord.lon
        var latitude = response.coord.lat
        var UV1 = $("<p>");

        var UVURL = "http://api.openweathermap.org/data/2.5/uvi?appid=dad65bfed30c91a1b6ddb18a13a78f78&lat=" + latitude + "&lon=" + longitude
        $.ajax({
            method: "GET",
            url: UVURL
        }).then(function (response) {
            UV1.text("UV Index: " + response.value)
            storedHTML = $("#info").html()
            localStorage.setItem("storedHTML", storedHTML)
        })

        var dayForecast = $("<div>");

        dayForecast.append(city1, wind1, humid1, temp1, UV1,);
        $("#items").html(dayForecast)

    });

    var FiveDayweatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=dc3b26ac9a18483a9000884d9ebbbe65"

    $.ajax({
        url: FiveDayweatherUrl,
        method: "GET",
    }).then(function (response) {
        // empty div once reloaded
        $("#forecast").empty();
        var results = response.list;
        $("#forecast").html("<h3 class=\"mt-3\" id=\"fiveDay\">5-Day Forecast for: " + city + "</h3>").append();

        for (var i = 0; i < results.length; i += 8) {
            // Creating a div
            var fiveDayDiv = $("<div class='card shadow-lg text-white bg-dark mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");
            
            //Storing the responses date temp and humidity.......
            var date = results[i].dt_txt;
            var setD = date.substr(0,10)
            var temp = results[i].main.temp;
            var hum = results[i].main.humidity;
   
            //creating tags with the result items information.....
            var h5date = $("<h5 class='card-title'>").text(setD);
            var pTemp = $("<p class='card-text'>").text("Temp: " + temp);;
            var pHum = $("<p class='card-text'>").text("Humidity " + hum);;

            var weather = results[i].weather[0].main

            if (weather === "Rain") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
                icon.attr("style", "height: 40px; width: 40px");
            } else if (weather === "Clouds") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
                icon.attr("style", "height: 40px; width: 40px");
            } 
             else if (weather === "Clear") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
                icon.attr("style", "height: 40px; width: 40px");
            }
             else if (weather === "Drizzle") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
                icon.attr("style", "height: 40px; width: 40px");
            }
             else if (weather === "Snow") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
                icon.attr("style", "height: 40px; width: 40px");
            }

            //append items to.......
            fiveDayDiv.append(h5date);
            fiveDayDiv.append(icon);
            fiveDayDiv.append(pTemp);
            fiveDayDiv.append(pHum);
            $("#forecast").append(fiveDayDiv);
        }
    });


});

