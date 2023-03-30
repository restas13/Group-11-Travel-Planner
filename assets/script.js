countrylink = 'https://restcountries.com/v3.1/name/ecuador?fullText=true';


fetch(countrylink)
    .then(function (response) {
        console.log(response);
        response.json().then(function (data) {
            console.log(data);
        });
    });