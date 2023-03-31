var search = document.querySelector('#search-btn');
var searchArea = document.querySelector('#search-text');
var resultContainer = document.querySelector('.container');


function countrySearch(event) { 
    event.preventDefault();

    var countryLink = 'https://restcountries.com/v3.1/name/' + searchArea.value;

    fetch(countryLink)
    .then(function (response) {
        console.log(response.status);
        response.json()
        .then(function (data) {
            console.log(data);
            var currency = Object.keys(data[0]['currencies'])[0];
            console.log(currency);
            console.log(data['0']["currencies"][currency])
            renderLocation(data[0].name.common, data[0]['currencies'][currency]['name'], data[0].continents, data[0].capital);
        });
    });
}

function renderLocation(name, currency, continent, capital) {
    var ul = document.createElement('ul');

    var nameText = 'Name: ' + name;
    var currencyText = 'Currency: ' + currency;
    var continentText = 'Continent: ' + continent;
    var capitalText = 'Capital: ' + capital;

    var cardContents = [nameText, currencyText, continentText, capitalText];

    for (var i = 0; i < cardContents.length; i++) {
        var li = document.createElement('li');

        li.textContent = cardContents[i];

        ul.appendChild(li);
    }
    
    resultContainer.appendChild(ul);
}

search.addEventListener('click', countrySearch)

