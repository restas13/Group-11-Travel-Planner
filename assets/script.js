countrylink = 'https://restcountries.com/v3.1/name/ecuador?fullText=true';


fetch(countrylink)
    .then(function (response) {
        console.log(response);
        response.json().then(function (data) {
            console.log(data);
        });
    });


weatherLink = 'https://api.openweathermap.org/data/2.5/weather?q=orlando,32812&appid=73c15a19bebffba4ddf655737bbc2b28'

fetch(weatherLink)
    .then(function (response) {
        console.log(response);
        response.json().then(function (data) {
            console.log(data);
        });
    });