cityListEl = document.querySelector("#previous");
mainCityEl = document.querySelector("#featured-city");
forecastEl = document.querySelector("#upcoming");
searchBtn = document.querySelector("#button-addon2");
todaysDate = (moment().format("L"));

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
                console.log(cityInfo.weather[0].icon);
                //Clear out previous search result
                mainCityEl.innerHTML = "";
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
                        fList.textContent += "UV Index: " + uvInfo.value;
                        if (uvInfo.value)
                    })
            })
    }

    //Take the information from the fetches and append to the maincityEl

    //Create a for loop that will display cooresponding information for the upcoming 5 days

    //Append previous searches to the left-hand menu.

};
