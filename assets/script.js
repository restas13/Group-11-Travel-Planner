const issueContainer = document.getElementById('issues');
const fetchButton = document.getElementById('fetch-button');
const inputval = document.querySelector('#cityinput')
const city = document.querySelector('#cityoutput')
const descrip = document.querySelector('#description')
const temp = document.querySelector('#temp')
const wind = document.querySelector('#wind')


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