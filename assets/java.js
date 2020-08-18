
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

        var temp = (response.main.temp - 273.15) * 1.80 + 32;
        $(".temp").text("Temperature (E) " + temp);


        var city = $(".input").val();
        var FiveDayweatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",=us&mode=xml&appid=28fee4a850a11acde54e23ea2b646a15"

        $.ajax({
            url: FiveDayweatherUrl,
            method: "GET",
        }).then(function (response) {
            $(".forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");
            for (var i = 0; i < response.list; i++) {
                // only look at forecasts around 3:00pm
                if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                  // create html elements for a bootstrap card
                  var col = $("<div>").addClass("col-md-2");
                  var card = $("<div>").addClass("card bg-primary text-white");
                  var body = $("<div>").addClass("card-body p-2");
      
                  var title = $("<h5>").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocaleDateString());
      
                  var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
      
                  var p1 = $("<p>").addClass("card-text").text("Temp: " + response.list[i].main.temp_max + " °F");
                  var p2 = $("<p>").addClass("card-text").text("Humidity: " + response.list[i].main.humidity + "%");
      
                  // merge together and put on page
                  col.append(card.append(body.append(title, img, p1, p2)));
                  $(".forecast .row").append(col);
                }
              }
            console.log(weatherUrl);
            console.log(response)


        });

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

});

