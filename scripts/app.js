const cityForm = document.querySelector('form');

const card = document.querySelector('.card');
const details = document.querySelector('.details');

const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

// show the data in User Interface
const updateUI = (data) => {

    // get city and weather object from updateCity() function
    // const cityDetails = data.cityDetails;
    // const weather = data.weather;


    // destructure: (easy way to get property from object and set as a constant with same name)
    // variable is the same name as property
    // go to data.cityDetails and set is as a variable, go to data.weather property and set as a variable
    
    const {cityDetails, weather} = data;

    // update details template
    details.innerHTML = `
        <h5>${cityDetails.EnglishName}</h5>
        <div>${weather.WeatherText}</div>
        <div>
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // display card
    card.removeAttribute("style");

    // update the day and night images
    let timeSrc = null;
    // if (weather.IsDayTime){
    //     timeSrc = 'img/day.svg';
    // }
    // else{
    //     timeSrc = 'img/night.svg';
    // }

    // ternaty operator
    timeSrc =  (weather.IsDayTime) ? 'img/day.svg': 'img/night.svg';
    time.setAttribute('src', timeSrc);

    // update icons
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
};


// pass in input city name, return citydetails and weather
const updateCity = async (city) => { // interact with forecast.js async function, they all need some time to finish

    // console.log(city);

    // because getCity() is async func return promise, so await to make sure getCity(city) is finished before assign value to cityDetails
    const cityDetails = await getCity(city);  // object about the city

    const weather = await getWeather(cityDetails.Key); // object about the weather

    return { // return new object with two properties
        cityDetails: cityDetails,
        weather: weather
    };
};

cityForm.addEventListener('submit', event => {
    event.preventDefault();

    // get input city value
    const city = cityForm.city.value.trim();

    // cityForm.reset();

    // update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(error => console.log(error)); 

    // updateCity(city)
    //     .then(data => console.log(data))
    //     .catch(error => console.log(error)); 

});

// async function always return promise









/*
{cityDetails: {…}, weather: {…}}

cityDetails:
AdministrativeArea: {ID: "QC", LocalizedName: "Quebec", EnglishName: "Quebec", Level: 1, LocalizedType: "Province", …}
Country: {ID: "CA", LocalizedName: "Canada", EnglishName: "Canada"}
DataSets: (7) ["AirQualityCurrentConditions", "AirQualityForecasts", "Alerts", "ForecastConfidence", "FutureRadar", "MinuteCast", "Radar"]
EnglishName: "Montreal"
GeoPosition: {Latitude: 45.506, Longitude: -73.574, Elevation: {…}}
IsAlias: false
Key: "56186"
LocalizedName: "Montreal"
PrimaryPostalCode: "H3A"
Rank: 25
Region: {ID: "NAM", LocalizedName: "North America", EnglishName: "North America"}
SupplementalAdminAreas: [{…}]
TimeZone: {Code: "EDT", Name: "America/Montreal", GmtOffset: -4, IsDaylightSaving: true, NextOffsetChange: "2021-11-07T06:00:00Z"}
Type: "City"
Version: 1

weather:
EpochTime: 1616551680
HasPrecipitation: false
IsDayTime: false
Link: "http://www.accuweather.com/en/ca/montreal/h3a/current-weather/56186?lang=en-us"
LocalObservationDateTime: "2021-03-23T22:08:00-04:00"
MobileLink: "http://m.accuweather.com/en/ca/montreal/h3a/current-weather/56186?lang=en-us"
PrecipitationType: null
Temperature: {Metric: {…}, Imperial: {…}}
WeatherIcon: 7
WeatherText: "Cloudy"

*/