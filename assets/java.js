
if (localStorage.getItem("searchhistory")) {
    searchHistoryArray = JSON.parse(localStorage.getItem("searchhistory"))
}
else {
    searchHistoryArray = []
}
if (localStorage.getItem("storedHTML")) {
    $("#info").html(localStorage.getItem("storedHTML"))
}
var city = $(".input")
var UVl = $(".UV")




for (i of searchHistoryArray) {
    var searchItemDiv = $("<div>").text(i).addClass("searchhistoryitem")
    city.append(searchItemDiv)
}




// ajax calls that will show up on the console also pull the information from OpenWeatherMap
$("#submitCity").on("click", function () {
    var searchValue = $("#search-value").val();
    var FiveDayweatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=28fee4a850a11acde54e23ea2b646a15"
    var city = $(".input").val();
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=dc3b26ac9a18483a9000884d9ebbbe65"

    $.ajax({
        url: weatherUrl,
        method: "GET",

    }).then(function (response) {
        console.log(weatherUrl);
        console.log(response)


        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").text("Windspeed: " + response.wind.speed + " MPH");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".temp").text("Temperature: " + response.main.temp + "°F");
        var longitude = response.coord.lon
        var latitude = response.coord.lat
        var UV1 = $(".UV")

        var temp = Math.round(response.main.temp - 273.15) * 1.80 + 32;
        $(".temp").text("Temperature " + temp);


        var city = $(".input").val();
        var UVURL = "http://api.openweathermap.org/data/2.5/uvi?appid=dad65bfed30c91a1b6ddb18a13a78f78&lat=" + latitude + "&lon=" + longitude
        $.ajax({
            method: "GET",
            url: UVURL
        }).then(function (response) {
            UV1.text("UV Index: " + response.value)
            storedHTML = $("#info").html()
            localStorage.setItem("storedHTML", storedHTML)
        })

    });
    $.ajax({
        url: FiveDayweatherUrl,
        method: "GET",
    }).then(function (response) {
        $("#forecast").html("<h1 class=\"mt-3\">5-Day Forecast for: " + city + "</h4>").append("<div class=\"row\">");
        $("<div>").addClass("col-md-2");
        $(".card").addClass("card bg-primary text-white");
        $("<div>").addClass("card-body p-2");

        // $("<h5>").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocaleDateString());

        // $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather + ".png");

        $("temp-high").addClass("card-text").text("High Temperature: " + response.main.temp_max + " °F");
        $("temp-low").text("Low Temperature: " + response.main.temp_min + "°F");
        $("humidity5").addClass("card-text").text("Humidity: " + response.main.humidity + "%");

        // merge together and put on page
        col.append(card.append(body.append(title, img, p1, p2)));
        $("#forecast .row").append(col);
        console.log(FiveDayweatherUrl);
        console.log(response)


    });


});

