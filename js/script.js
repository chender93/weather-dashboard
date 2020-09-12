cityListEl = document.querySelector("#previous");
mainCityEl = document.querySelector("#featured-city");
foreHeader = document.querySelector("#foreText");
forecastEl = document.querySelector("#upcoming");
searchBtn = document.querySelector("#button-addon2");
todaysDate = (moment().format("L"));
dayCounter = 1;

searchBtn.onclick = function (choice) {
    //Logs the user's search choice
    choice = document.querySelector("#searchedCity").value;

    //Creates a button that will take users to previously searched cities
    searchedCity = document.createElement("button");
    searchedCity.className = "list-group-item";
    searchedCity.textContent = choice;
    cityListEl.appendChild(searchedCity);

    //Fetch Request colleting weather information
    if (!choice) {
        alert("You must select a city before searching!");
        return;
    } else {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + choice +
            "&appid=f19269e626e5152019a125e36257aaf9&units=imperial")
            .then(function (cityInfo) {
                return cityInfo.json();
            })
            .then(function (cityInfo) {
                //Clear out previous search result
                mainCityEl.innerHTML = "";
                forecastEl.innerHTML = "";
                //Create Weather Icon
                weatherIco = document.createElement("div");
                weatherIco.innerHTML = "<img src='http://openweathermap.org/img/w/" + cityInfo.weather[0].icon + ".png' />";
                //Create searched city result
                featureEl = document.createElement("h2");
                featureEl.textContent = cityInfo.name + " (" + todaysDate + ") ";
                fList = document.createElement("p");
                fList.setAttribute('style', 'white-space: pre;');
                fList.textContent = "Temperature: " + cityInfo.main.temp + "\r\n";
                fList.textContent += "Humidity: " + cityInfo.main.humidity + "%\r\n";
                fList.textContent += "Wind Speed: " + cityInfo.wind.speed + "\r\n";
                //Appending Everything to the Main Display
                featureEl.appendChild(weatherIco);
                mainCityEl.appendChild(featureEl);
                mainCityEl.appendChild(fList);
                fetch("http://api.openweathermap.org/data/2.5/uvi?appid=f19269e626e5152019a125e36257aaf9&lat="
                    //Insert lat coordinates from above search
                    + cityInfo.coord.lat +
                    "&lon="
                    //Insert lon coordinated from above search
                    + cityInfo.coord.lat
                )
                    .then(function (uvInfo) {
                        return uvInfo.json();
                    })
                    .then(function (uvInfo) {
                        uvIco = document.createElement("div");
                        if (uvInfo.value >= 8) {
                            uvIco.innerHTML = "<img src='https://raw.githubusercontent.com/chender93/weather-dashboard/feature/city-search/images/badUV.png' />"
                        } else if (uvInfo.value >= 6) {
                            uvIco.innerHTML = "<img src='https://raw.githubusercontent.com/chender93/weather-dashboard/feature/city-search/images/neutraUV.png' />"
                        } else {
                            uvIco.innerHTML = "<img src='https://raw.githubusercontent.com/chender93/weather-dashboard/feature/city-search/images/goodUV.png' />"
                        }
                        fList.textContent += "UV Index: " + uvInfo.value;
                        fList.appendChild(uvIco);
                    })
            })
        fiveDay();
    }
    //Append previous searches to the left-hand menu.

};

//Create a for loop that will display cooresponding information for the upcoming 5 days
fiveDay = function (choice) {
    choice = document.querySelector("#searchedCity").value;
    fetch("http://api.openweathermap.org/data/2.5/forecast?q="
        + choice +
        "&appid=f19269e626e5152019a125e36257aaf9&units=imperial")
        .then(function (forecastInfo) {
            return forecastInfo.json();
        })
        .then(function (forecastInfo) {
            foreHeader.textContent = "5-Day Forecast: ";
            for (var i = 1; i <= 5; i++) {
                dayCard = document.createElement("li");
                forecastIco = document.createElement("div");
                forecastIco.innerHTML = "<img src='http://openweathermap.org/img/w/" + forecastInfo.list[i].weather[0].icon + ".png' />"
                dayCard.setAttribute('style', 'white-space: pre;');
                dayCard.classList.add("list-group-item", "bg-primary", "mx-2", "text-light");
                dayCard.textContent = (moment().add(dayCounter, "d").format("L")) + "\r\n";
                dayCard.textContent += "Temperature: " + forecastInfo.list[i].main.temp + "%\r\n";
                dayCard.textContent += "Humidity: " + forecastInfo.list[i].main.humidity + "%\r\n";
                dayCard.appendChild(forecastIco);
                forecastEl.appendChild(dayCard);
                dayCounter++
            }
        })
}

