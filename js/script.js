cityListEl = document.querySelector("#previous");
mainCityEl = document.querySelector("#featured-city");
forecastEl = document.querySelector("#upcoming");
searchBtn = document.querySelector("#button-addon2");

searchBtn.onclick = function (choice) {
    choice = document.querySelector("#searchedCity").value;
    console.log(choice);
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
                console.log(cityInfo);
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
                        console.log(uvInfo.value);
                    })
            })
    }

    //Take the information from the fetches and append to the maincityEl
    
    //Create a for loop that will display cooresponding information for the upcoming 5 days

    //Append previous searches to the left-hand menu.
        
};
