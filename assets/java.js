
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
    $("#submitCity").on("click", function(){

        var city = $(".input").val();
        var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c"

        $.ajax({
            url: weatherUrl,
            method: "GET",
        
        }).then(function(response){
           console.log(weatherUrl);
           console.log(response)


           $(".city").html("<h1>" + response.name + " Weather Details</h1>");
           $(".wind").text("Windspeed: " + response.wind.speed + " MPH");
           $(".humidity").text("Humidity: " + response.main.humidity + "%");
           $(".temp").text("Temperature: " + response.main.temp + "ºF");
           var longitude = response.coord.lon
           var latitude = response.coord.lat
           var UV1 = $(".UV")
           
           var tempF = (response.main.temp - 273.15) * 1.80 + 32;
           $(".tempF").text("Temperature (Kelvin) " + tempF);


           var city = $(".input").val();
           var FiveDayweatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",=us&mode=xml&appid=7ba67ac190f85fdba2e2dc6b9d32e93c"

           $.ajax({
               url:FiveDayweatherUrl,
               method: "GET",
           }).then(function(response){
               console.log(weatherUrl);
               console.log(response)
               

           })
   
           var UVURL = "http://api.openweathermap.org/data/2.5/uvi?appid=dad65bfed30c91a1b6ddb18a13a78f78&lat=" + latitude + "&lon=" + longitude
           $.ajax({
           method: "GET",
           url: UVURL
           }).then(function(response) {
               UV1.text("UV Index: " + response.value)
               storedHTML = $("#info").html()
               localStorage.setItem("storedHTML", storedHTML)
           })


        }); 
    });

