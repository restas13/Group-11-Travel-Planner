var search = document.querySelector('#search-btn');
var searchArea = document.querySelector('#search-text');
var resultContainer = document.querySelector('.container');
var previousSearch = document.querySelector('#searchedCountries');

var searched = [];
var searchType = 'name';

//Modal Start
// Get the modal
var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
//Modal End


if (localStorage.getItem('searchedCountries')) {
    searched = JSON.parse(localStorage.getItem('searchedCountries'));
}

function countrySearch(event, country) { 
    event.preventDefault();

    if (resultContainer.childElementCount >= 1) {
        var countryCont = document.querySelector('.countryinfo');

        resultContainer.removeChild(countryCont);
    }

    var countryLink = 'https://restcountries.com/v3.1/name/' + country;

    fetch(countryLink)
    .then(function (response) {
        console.log(country);
        response.json()
        .then(function (data) {
            console.log(data);

            //Error Modal for wrong input
            if (response.status !== 200) {
            modal.style.display = "block";
            }

            var currency = Object.keys(data[0]['currencies'])[0];
            console.log(currency);
            console.log(data['0']["currencies"][currency])
            renderLocation(data[0].name.common, data[0]['currencies'][currency]['name'], data[0].continents, data[0].capital);

            


            var isPresent = false;
            if (searched.length > 0){
                for (var i = 0; i < searched.length; i++) {
                    //console.log('working');
                    if (data[0].name.common == searched[i]) {
                        isPresent = true;
                    }
                }
                if (isPresent == false) {
                    searched.push(data[0].name.common);
                    console.log('added');
                    console.log(searched);
                }

            }else {
                searched.push(data[0].name.common);
                console.log('added');
                console.log(searched);

            }
            storeSearches();
            renderSearched();
        });
    });
}

function currencySearch(event) {
    event.preventDefault();

    if (resultContainer.childElementCount >= 1) {
        var countryCont = document.querySelector('.countryinfo');

        resultContainer.removeChild(countryCont);
    }

    var countryLink = 'https://restcountries.com/v3.1/currency/' + searchArea.value;

    fetch(countryLink)
    .then(function (response) {
        console.log(response.status);
        response.json()
        .then(function (data) {
            console.log(data);


            var ul = document.createElement('ul')
            for (var i = 0; i < data.length; i++) {
                var li = document.createElement('button');

                li.textContent = data[i].name.common;
                li.classList.add(li.textContent.replaceAll(' ', '-'));
                console.log(li.textContent.replaceAll(' ', '-'));

                ul.appendChild(li);
            }

            ul.addEventListener('click', function(event) {
                console.log(event.target.classList[0]);
                countrySearch(event, event.target.classList[0].replaceAll('-', ' '));
            })

            ul.classList.add('countryinfo')

            resultContainer.appendChild(ul);
        })
    })
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
    ul.classList.add('countryinfo');
    
    resultContainer.appendChild(ul);
}

function storeSearches() {

    localStorage.setItem('searchedCountries', JSON.stringify(searched));
    
}

function renderSearched() {
    var ul = document.createElement('ul')

    if (previousSearch.childElementCount >= 1) {
        var prev = document.querySelector('.prevCountries');

        previousSearch.removeChild(prev);
    }

    for (var i = 0; i < searched.length; i++) {
        var li = document.createElement('button');

        li.textContent = searched[i];
        li.classList.add(searched[i]);
        ul.appendChild(li);
    }

    ul.addEventListener('click', function(event) {
        console.log(event.target.classList[0]);
        countrySearch(event, event.target.classList[0]);
    })
    ul.classList.add('prevCountries');

    previousSearch.appendChild(ul);
}

search.addEventListener('click', function() {
    if (searchType == 'currency') {
        currencySearch(event, searchArea.value);
    }else if (searchType == 'name') {
        countrySearch(event, searchArea.value);
    }
    
});

renderSearched();


