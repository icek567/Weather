$("#submitCity").on("click", function(event) {
    event.preventDefault();
    var city = $(".input").val().trim();
    var content = $(this).siblings("input").val();
    var storeContent = [];
    storeContent.push(content);
    localStorage.setItem("city", JSON.stringify(storeContent)); 

    if (city == "" || city == null ){
        alert("Please add City")
        return false
    }
    getData(city);
    pageLoad();

});


function pageLoad () {
    var lastSearch = JSON.parse(localStorage.getItem("city"));
    var searchDiv = $("<button class='btn btn-outline-primary mt-1 shadow-sm rounded' style='width: 12rem;'>").text(lastSearch);
    var psearch = $("<div>");
    psearch.append(searchDiv)
    $("#searchedCities").prepend(psearch);
}


$("#searchedCities").on('click', '.btn', function(event){
    event.preventDefault();
    console.log($(this).text());
    getData($(this).text());
});


// ajax calls that will show up on the console also pull the information from OpenWeatherMap
function getData(city) {
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=dc3b26ac9a18483a9000884d9ebbbe65"
    var setDate = moment().format('L');
    var setTime = new Date().toLocaleTimeString();
    
    $.ajax({
        url: weatherUrl,
        method: "GET",

    }).then(function (response) {
        console.log(weatherUrl);
        console.log(response)
        $("#items").empty();
        var Temperature = Math.round(response.main.temp);
        var sameDay = response.weather[0].icon;
        
        var city1 = $("<h1>").text( response.name + "  " + setDate );
        var time = $("<h3>").text(response.weather[0].main + "        " + setTime);
        var wind1 = $("<p>").text("Windspeed: " + response.wind.speed + " MPH");
        var humid1 = $("<p>").text("Humidity: " + response.main.humidity + "%");
        var temp1 =$("<p>").text("Temperature: " + Temperature +  "°F");
        var longitude = response.coord.lon
        var latitude = response.coord.lat
        var sameIcon = $ ('<img>').attr("src", "https://openweathermap.org/img/w/" + sameDay + ".png")
        sameIcon.attr("style", "height: 100px; width: 100px");



        // code for getting the UV information
        var UV1 = $("<button class=\"UV btn btn-secondary btn-sm\" disabled>");
        var UVURL = "https://api.openweathermap.org/data/2.5/uvi?appid=dad65bfed30c91a1b6ddb18a13a78f78&lat=" + latitude + "&lon=" + longitude
        $.ajax({
            method: "GET",
            url: UVURL
        }).then(function (response) {
            UV1.text("UV Index: " + response.value)
            storedHTML = $("#info").html()
            localStorage.setItem("storedHTML", storedHTML)
        })

        var dayForecast = $("<div class='card p-3 mb-5 text-white rounded' id=\"dayCast\" >");

        dayForecast.append(city1, time, sameIcon ,wind1, humid1, temp1, UV1,);
        $("#items").html(dayForecast);

        // $("#dayCast").change(function(){
        //     var changeColor = Temperature;
        //     var color = "linear-gradient(to right, #0f2027, #203a43, #2c5364)"
        //     if(changeColor > 80 && changeColor <= 110){
        //         color='red'
        //     }
        //     else if (changeColor > 60 && changeColor <= 79){
        //     color = 'green'
        //     }
        //     $('.card').css('background', color)
        // });

    });


    var FiveDayweatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=dc3b26ac9a18483a9000884d9ebbbe65"

    $.ajax({
        url: FiveDayweatherUrl,
        method: "GET",
    }).then(function (response) {
        // empty div once reloaded
        $("#forecast").empty();
        var results = response.list;
        $("#title").html("<h1 class=\"mt-3 text-white\" >5-Day Forecast for " + city + "</h1>");

        for (var i = 0; i < results.length; i += 8) {
            // Creating a div
            var fiveDayDiv = $("<div id=\"fiveDay\" class='card bg-dark text-white rounded mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem; margin-right: 5rem;'>");
            
            //Storing the responses date temp and humidity.......
            var date = results[i].dt_txt;
            var setD = date.substr(0,10)
            var temp = results[i].main.temp;
            var hum = results[i].main.humidity;
   
            //creating tags with the result items information.....
            var h5date = $("<h5 class='card-title'>").text(setD);
            var pTemp = $("<p class='card-text'>").text("Temp: " + temp + "°F");;
            var pHum = $("<p class='card-text'>").text("Humidity: " + hum + "%");;
            var weather = results[i].weather[0].icon;

            var icon = $ ('<img>').attr("src", "https://openweathermap.org/img/w/" + weather + ".png")
            icon.attr("style", "height: 40px; width: 40px;");

            //append items to.......
            fiveDayDiv.append(h5date, icon, pTemp, pHum);
            $("#forecast").append(fiveDayDiv);
        }

    });
}
pageLoad();