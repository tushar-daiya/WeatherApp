const button = document.getElementById("search_button");
const city = document.getElementById("location-name");
const searchbar = document.getElementById("city");
const temperature = document.getElementById("temperature");
const conditionImageMain = document.getElementById("condition-image-main");
const stateCountry = document.getElementById("state-country");
let date;
date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let spinner = document.querySelector('.loading-screen');

spinner.classList.remove('hidden');
spinner.classList.add('flex');
window.onload = function () {
    searchbar.value = "";
    addValues("kolkata");
}
spinner.classList.add('hidden');
spinner.classList.remove('flex');

document.addEventListener('click', function (event) {
    var searchContainer = document.getElementById("search_container");
    var ul = document.getElementById("suggestions");
    if (!searchContainer.contains(event.target)) {
        ul.classList.add("hidden")
    }
});

const temp6am = document.getElementById("6am-temp");
const temp9am = document.getElementById("9am-temp");
const temp12pm = document.getElementById("12pm-temp");
const temp3pm = document.getElementById("3pm-temp");
const temp6pm = document.getElementById("6pm-temp");
const temp9pm = document.getElementById("9pm-temp");
const img6am = document.getElementById("6am-img");
const img9am = document.getElementById("9am-img");
const img12pm = document.getElementById("12pm-img");
const img3pm = document.getElementById("3pm-img");
const img6pm = document.getElementById("6pm-img");
const img9pm = document.getElementById("9pm-img");
const wind_kph = document.getElementById("wind_kph");
const uv_index = document.getElementById("uv_index");
const rain_chance = document.getElementById("rain_chance");
const feel_temp = document.getElementById("feel_temp");
const day_name = document.getElementsByClassName("day1Name");
const dayConditionImg = document.getElementsByClassName("day1ConditionImg");
const dayCondition = document.getElementsByClassName("day1Condition");
const daymaxTemp = document.getElementsByClassName("day1MaxTemp");
const dayminTemp = document.getElementsByClassName("day1MinTemp");
const suggestionContainer = document.getElementById("suggestions");


function addValues(searchLocation) {
    spinner.classList.remove('hidden');
    spinner.classList.add('flex');
    fetch("https://api.weatherapi.com/v1/forecast.json?key=fd2bc748fcab4fdf8a853214232301&q=" + searchLocation + "&days=7&aqi=yes&alerts=yes")
        .then(Response => Response.json())
        .then(data => {
            city.innerHTML = data.location.name;
            temperature.innerHTML = data.current.temp_c + "&#8451";
            conditionImageMain.src = data.current.condition.icon;
            stateCountry.innerHTML = data.location.region + " , " + data.location.country;
            wind_kph.innerHTML = data.current.wind_kph + " km/h";
            uv_index.innerHTML = data.current.uv;
            temp6am.innerHTML = data.forecast.forecastday[0].hour[6].temp_c + "&#8451";
            img6am.src = data.forecast.forecastday[0].hour[6].condition.icon;
            temp9am.innerHTML = data.forecast.forecastday[0].hour[9].temp_c + "&#8451";
            img9am.src = data.forecast.forecastday[0].hour[9].condition.icon;
            temp12pm.innerHTML = data.forecast.forecastday[0].hour[12].temp_c + "&#8451";
            img12pm.src = data.forecast.forecastday[0].hour[12].condition.icon;
            temp3pm.innerHTML = data.forecast.forecastday[0].hour[15].temp_c + "&#8451";
            img3pm.src = data.forecast.forecastday[0].hour[15].condition.icon;
            temp6pm.innerHTML = data.forecast.forecastday[0].hour[18].temp_c + "&#8451";
            img6pm.src = data.forecast.forecastday[0].hour[18].condition.icon;
            temp9pm.innerHTML = data.forecast.forecastday[0].hour[21].temp_c + "&#8451";
            img9pm.src = data.forecast.forecastday[0].hour[21].condition.icon;
            rain_chance.innerHTML = data.forecast.forecastday[0].hour[0].chance_of_rain + "%";
            feel_temp.innerHTML = data.forecast.forecastday[0].hour[0].feelslike_c + "&#8451";
            for (let i = 0; i < 7; i++) {
                dayConditionImg[i].src = data.forecast.forecastday[i].day.condition.icon;
                dayCondition[i].innerHTML = data.forecast.forecastday[i].day.condition.text;
                daymaxTemp[i].innerHTML = data.forecast.forecastday[i].day.maxtemp_c;
                dayminTemp[i].innerHTML = "/" + data.forecast.forecastday[i].day.mintemp_c;
                const dateString = data.forecast.forecastday[i].date;
                const date = new Date(dateString);
                const dayName = date.toLocaleString('en-US', { weekday: 'long' });
                day_name[i].innerHTML = dayName;
            }
            spinner.classList.add('hidden');
            spinner.classList.remove('flex');


        })
}


button.addEventListener("click", function tushar() {
    const searchcity = searchbar.value;
    addValues(searchcity);
    searchbar.value = "";
    suggestionContainer.innerHTML = "";
    suggestionContainer.classList.add("hidden");


})
searchbar.addEventListener("keyup", function (event) {
    if (event.key == 'Enter') {
        button.click();
    }
})

searchbar.addEventListener("click", function (event) {
    const searchvalue = event.target.value;
    if (searchvalue.length > 2) {
        suggestionContainer.classList.remove("hidden");
    }
})

searchbar.addEventListener("input", function (event) {
    const searchvalue = event.target.value;
    if (searchvalue.length < 3) {
        suggestionContainer.innerHTML = "";
        suggestionContainer.classList.add("hidden")
    }

    if (searchvalue.length > 2) {
        fetch("https://api.weatherapi.com/v1/search.json?key=fd2bc748fcab4fdf8a853214232301&q=" + searchvalue)
            .then(Response => Response.json())
            .then(data => {
                suggestionContainer.classList.remove("hidden");
                suggestionContainer.innerHTML = "";
                if (data.length == 0) {
                    console.log("hello");

                    var suggestionElement1 = document.createElement("li");
                    suggestionElement1.innerHTML = "No cities found!";
                    suggestionContainer.appendChild(suggestionElement1);
                }
                for (var i = 0; i < data.length; i++) {
                    var suggestionElement = document.createElement("li");
                    suggestionElement.innerHTML = data[i].name + ", " + data[i].region + ", " + data[i].country;
                    suggestionContainer.appendChild(suggestionElement);
                    if (i != data.length - 1) {
                        suggestionElement.classList.add("border-b-2", "border-gray-400");
                    }
                }
                const suggestionitems = document.querySelectorAll("#suggestions li");

                for (var i = 0; i < suggestionitems.length; i++) {
                    suggestionitems[i].addEventListener("click", function (event) {

                        var temporary = event.target.innerHTML;

                        addValues(temporary);
                        suggestionContainer.innerHTML = "";
                        suggestionContainer.classList.add("hidden");
                        searchbar.value = "";
                    })
                }

            })

    }
})




