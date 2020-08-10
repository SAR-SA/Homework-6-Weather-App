$(function () {

    // Today's date from Moment
    //currentDayElement.text(todayDate.format('dddd, M D YYYY'));

    let temp = $("#temperature");
    let humid = $("#humidity");
    let wind = $("#windspeed");
    let uV = $(".uvIndex");
    let date = $("#date");
    const todayDate = moment().format(" (M/D/YYYY)");
    const searchBtn = $("#searchBtn");
    const searchInput = $(".searchBar");
    const one = $(".dayOne");
    const two = $(".dayTwo");
    const three = $(".dayThree");
    const four = $(".dayFour");
    const five = $(".dayFive");


    //User enters city into search bar and hits search
    //API calls the city weather
    searchBtn.on("click", function () {
        console.log("This button is working");
        cityName = searchInput.val();
        var settings = {
            "url": "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=a8bcffded6bdeeb862d36f82c2ad45cc",
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            // var kelToF = ()
            $("#mainCity").text(response.name + todayDate);
            var icon = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
            $("#weatherPic").attr("src", icon);
            $(".mainTemp").text("Temperature: " + response.main.temp + " F");
            $(".mainHum").text("Humidity: " + response.main.humidity);
            $(".windSpeed").text("Wind Speed: " + response.wind.speed);
            //$(".uvIndex").text("UV Index: " + response.)
        })
            .then(function (response) {
                let lat = response.coord.lat;
                let lon = response.coord.lon;
                var uvSettings = {
                    "url": `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
                      exclude={part}&appid=a8bcffded6bdeeb862d36f82c2ad45cc`,
                    "method": "GET",
                    "timeout": 0,
                };

                $.ajax(uvSettings).done(function (response) {
                    console.log(response);
                })
                    .then(function (response) {
                        uvi = response.current.uvi;
                        uV.text("UV Index: " + uvi);

                        //function uviColors() {
                        if (uV < 2) {
                            // return "green";

                            uV.css("background-color", "green");
                        }
                        else if (uV >= 3 && uvi < 6) {
                            //return "yellow"

                            uV.css("background-color", "yellow");
                        }
                        else if (uV >= 6 && uvi < 8) {
                            //return "orange"

                            uV.css("background-color", "orange");
                        }
                        else if (uV >= 8 && uvi < 10) {
                            //return "red"

                            uV.css("background-color", "red");
                        }
                        else {
                            //return "purple"

                            uV.css("text-background", " 5px 5px purple");
                        }
                        //}
                        for (let i= 1; i<6; i++) {
                            let icons = response.daily[i-1].weather[0].icon;
                            let descriptions = response.daily[i-1].weather[0].description;
                            let temps = response.daily[i-1].temp.day; 
                            let humidities = response.daily[i-1].humidity
                            $(`span.date${i}`).text(moment().add(i-1, 'd').format('l'));
                            $(`img.icon${i}`).attr('src', `http://openweathermap.org/img/wn/${icons}.png`).attr("alt", descriptions);
                            $(`span.temperature${i}`).text(Math.round((temps-273.15)*9/5 + 32));
                            $(`span.humidity${i}`).text(humidities); 
                        }
                    })
            });

    });

    // var fiveDaySettings = {
    //     "url": `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=a8bcffded6bdeeb862d36f82c2ad45cc`,
    //     "method": "GET",
    //     "timeout": 0,
    // };

    // $.ajax(fiveDaySettings).done(function (response) {
    //     console.log(response);
    // });


    //Current weather is displayed in the main area


    //5 day forcast is displayed in the corresponding day blocks


    //The city searched is prepended to the history list


});