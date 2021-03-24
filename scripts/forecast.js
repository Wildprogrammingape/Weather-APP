const key = 'Ur7ZnxN2RuFGxJl7ZCrbHeDk1jtojHcK';

// get weather information
const getWeather = async (id) =>{

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base+query);
    const data = await response.json();

    // console.log(data);
    return data[0];
};

// get city information
const getCity = async (city) =>{  // return promise

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    
    const response = await fetch(base + query); // wait until the promise resolve

    const data = await response.json();       //JSON return promise , data is object

    // console.log(data[0]);  // first data is the cloest match

    return data[0]; // get the Key from data object and pass to getWeather function

    
};

// getCity('montreal').then(data => {
//     return getWeather(data.Key); // return promise
// }).then(data =>{
//     console.log(data);
// }).catch(error => console.log(error));

// getWeather('56186');