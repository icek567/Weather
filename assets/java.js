
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
        });
       


    });







