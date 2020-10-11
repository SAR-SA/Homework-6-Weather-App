$(function () {
  
  let uV = $(".uvIndex");
  const todayDate = moment().format(" (M/D/YYYY)");
  const searchBtn = $("#searchBtn");
  const searchInput = $(".searchBar");
  const cityList = $(".city-list");
  const searchCities = $(".search");
  const cityInput = $(".city-text");


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
      $(".mainTemp").text("Temperature: " + response.main.temp + "° F");
      $(".mainHum").text("Humidity: " + response.main.humidity + "%");
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

              uV.css("background-color", "purple");
            }
            //}
            for (let i = 1; i < 6; i++) {
              let icons = response.daily[i - 1].weather[0].icon;
              let descriptions = response.daily[i - 1].weather[0].description;
              let temps = response.daily[i - 1].temp.day;
              let humidities = response.daily[i - 1].humidity
              $(`span.date${i}`).text(moment().add(i - 1, 'd').format('l'));
              $(`img.icon${i}`).attr('src', `http://openweathermap.org/img/wn/${icons}.png`).attr("alt", descriptions);
              $(`span.temperature${i}`).text(Math.round((temps - 273.15) * 9 / 5 + 32));
              $(`span.humidity${i}`).text(humidities);
            }
            storeCities();
          })
      });

    
  });

  var cities = [];

    init();

    searchBtn.on("click", function (event) {
      event.preventDefault();

      var cityName = searchInput.val.trim();

      // Return from function early if submitted todoText is blank
      if (cityText === "") {
        return;
      }

      // Add new todoText to todos array, clear the input
      cities.push(cityName);
      searchInput.value = "";

      // Store updated todos in localStorage, re-render the list
      storeCities();
      renderCities();
    });

    function renderCities() {
      cityList.innerHTML = "";

      for (var i = 0; i < cities.length; i++) {
        var city = cities[i];

        var li = document.createElement("li");
        li.textContent = city;
        li.setAttribute("data-index", i);

        var button = document.createElement("button");
        button.textContent = "Delete";

        li.appendChild(button);
        cityList.appendChild(li);
      }
    }

    function init() {
      var storedCities = JSON.parse(localStorage.getItem("cities"));

      if (storedCities !== null) {
        cities = storedCities;
      }

      renderCities();
    }

    function storeCities() {
      localStorage.setItem("cities", JSON.stringify(cities));
    }

});

// Today's date from Moment
  //currentDayElement.text(todayDate.format('dddd, M D YYYY'));
  // let temp = $("#temperature");
  // let humid = $("#humidity");
  // let wind = $("#windspeed");
  // let date = $("#date");
  // const one = $(".dayOne");
  // const two = $(".dayTwo");
  // const three = $(".dayThree");
  // const four = $(".dayFour");
  // const five = $(".dayFive");


 //       // Variables
    // const cities = [];

    // // FUNCTIONS
    // function newCity() {
    //   cityList.innerHTML = "";

    //    //Render a new li for each todo
    //    for (var i = 0; i < cities.length; i++) {
    //      var city = cities[i];

    //      var li = document.createElement("li");
    //      li.textContent = city;
    //      li.setAttribute("data-index", i);

    //      var button = document.createElement("button");
    //      button.textContent = "Delete";

    //      li.appendChild(button);
    //      cityList.appendChild(li);
    //    }
    //   // push into cities array
    //   // cities.push(newItem);
    // }

    // function removeItem(elementRef, itemIndexNum) {
    //   // Attach 'click' event to some dom element passed into this function as the first argument
    //   elementRef.on("click", function() {
    //     // Remove an item from the shopping list by index number
    //     // this mutates the original array
    //     cities.splice(itemIndexNum, 1);
    //     handleDisplayItems();
    //   });
    // }

    // // display shipping list to card on the dom
    // function handleDisplayItems() {
    //   // get a reference to the unordered list where the items will be appended
    //   const ul = $(".city-list");
    //   // Empty the innerHTML in the <ul> to make room for the altered shopping list
    //   ul.empty();
    //   // loop through the shopping list to create an <li> and append to the <ul>
    //   // the 'item' variable in our callback function being passed into the
    //   // forEach references each individual element in the shopping list array
    //   cities.forEach(function(item, currentIndex) {
    //     // use jQuery to create an <li> and <button>, add class names and set the text
    //     const li = $("<li>").text(item).addClass("list-group-item");
    //     const removeBtn = $("<button>").addClass("btn btn-danger float-right").text("remove");
    //     // call a function to attach a click event for removing items
    //     // it requires an element and an index number for an item in an array
    //     removeItem(removeBtn, currentIndex);

    //     // append the removeButton as a child in the <li>
    //     li.append(removeBtn);
    //     // append the <li> as a child in the <ul>
    //     ul.append(li);
    //   });
    // }

    // // EVENT LISTENERS
    // searchBtn.on("click", function () {
    //   event.preventDefault();
    //   // capture the input
    //   const $inputElem = searchInput;
    //   const userInput = $inputElem.val().trim();
    //   // remove the text value from the input
    //   $inputElem.val("");

    //   // update the list
    //   newCity(userInput);
    //   handleDisplayItems();
    // });

    // // INITALIZING CODE
    // newCity();
    // newCity();
    // handleDisplayItems();

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
