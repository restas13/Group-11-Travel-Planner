//Getting elements in the html file
var search = document.querySelector('#search-btn');
var userInput = document.querySelector('#country-input');
var resultContainer = document.querySelector('#result-container');
var previousSearch = document.querySelector('#searched-countries');

//creating the list of searchedcountries and setting the search type
var searched = [];
var searchType = 'name';


//Modal Start
// Get the modal
var namemodal = document.getElementById("nameModal");
var langmodal = document.getElementById("langModal");
var currmodal = document.getElementById("currModal");
var contmodal = document.getElementById("contModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//(x), close the modal
span.onclick = function() {
  namemodal.style.display = "none";
  currmodal.style.display = "none";
  contmodal.style.display = "none";
  langmodal.style.display = "none";
}

//clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == namemodal || event.target == langmodal || event.target == currmodal || event.target == contmodal) {
    namemodal.style.display = "none";
    langmodal.style.display = "none";
    currmodal.style.display = "none";
    contmodal.style.display = "none";
  }
}
//Modal End



// var userText = userInput.value;


//setting the searched list if there are any searched countries in the local storage
if (localStorage.getItem('searchedCountries')) {
    searched = JSON.parse(localStorage.getItem('searchedCountries'));
}

//Searching by country
function countrySearch(event, userInput) { 
    event.preventDefault();

    console.log(userInput);
    //deleting existing contents if there are existing elements within the container
    if (resultContainer.childElementCount >= 1) {
        var countryCont = document.querySelector('.countryinfo');

        resultContainer.removeChild(countryCont);
    }

    //country name link
    var countryLink = 'https://restcountries.com/v3.1/name/' + userInput + '?fullText=true';

    //fetching the information about the country
    fetch(countryLink)
    .then(function (response) {
        //logging the results and processing the data
        console.log(userInput);

        if (response.status != 200) {
            console.log(response.status);
            namemodal.style.display = "block";
            }

        response.json()
        .then(function (data) {
            //creating a variable for currency that gets the name of the currency from the returned data
            var currency = Object.keys(data[0]['currencies'])[0];

            //logging the currency value and the currency type from the data
            console.log(currency);
            console.log(data['0']["currencies"][currency])
            //displaying the results using the returned data as parameters
            renderLocation(data[0].name.common, data[0]['currencies'][currency]['name'], data[0].continents, data[0].capital);

            //setting isPresent to false automatcally
            var isPresent = false;
            //checking if the searched array has any values
            if (searched.length > 0){
                //cycling through the searched values to see if they match with the recent search
                for (var i = 0; i < searched.length; i++) {
                    //console.log('working');
                    //if the search does exist, the recent search does not get added to the list
                    if (data[0].name.common == searched[i]) {
                        isPresent = true;
                    }
                }
                //if the search doesn't exist, the recent search gets added to the searched list
                if (isPresent == false) {
                    searched.push(data[0].name.common);
                    console.log('added');
                    console.log(searched);
                }
            }else {
                //if the searched list has no values, the recent search gets added automatically
                searched.push(data[0].name.common);
                console.log('added');
                console.log(searched);
            }

            //stores the searched values
            storeSearches();
            //renders the searched values
            renderSearched();
        });
    });
}



function currencySearch(event, userInput) {
    event.preventDefault();

    //deleting existing contents if there are existing elements within the container
    if (resultContainer.childElementCount >= 1) {
        var countryCont = document.querySelector('.countryinfo');

        resultContainer.removeChild(countryCont);
    }

    //country currency link
    var countryLink = 'https://restcountries.com/v3.1/currency/' + userInput;

    //fetching the information about the countries that use the currency
    fetch(countryLink)
    .then(function (response) {
        //logging the status of the response and processing the response
        console.log(response.status);
        response.json()
        .then(function (data) {

            //logging the data
            console.log(data);

             //Error Modal for wrong input
             if (response.status !== 200) {
                currmodal.style.display = "block";
                }

            //creating a ul element that will contain the list of countries
            var ul = document.createElement('ul')

            //looping through the data and adding the names of the countries to the list as buttons
            for (var i = 0; i < data.length; i++) {
                var li = document.createElement('button');

                //adding the tex and class for each button
                li.textContent = data[i].name.common;

                
                li.classList.add('btn');
                li.classList.add('btn-danger');
                li.classList.add('indigo');
                li.classList.add('searched-btn');
                li.setAttribute('name', li.textContent);


                //adding the button to the ul element
                ul.appendChild(li);
            }

            //adding an event listener to the buttons so the user can click on the button and see results for searching for that country
            ul.addEventListener('click', function(event) {
                console.log(event.target.classList[0]);
                countrySearch(event, event.target.getAttribute('name'));
            })

            //adding the countryinfo class
            ul.classList.add('countryinfo')

            //adding the ul element to the container in the html file
            resultContainer.appendChild(ul);
        })
    })
}

function languageSearch(event, userInput) {
    event.preventDefault();

    //deleting existing contents if there are existing elements within the container
    if (resultContainer.childElementCount >= 1) {
        var countryCont = document.querySelector('.countryinfo');

        resultContainer.removeChild(countryCont);
    }

    //country language link
    var countryLink = 'https://restcountries.com/v3.1/lang/' + userInput;

    //fetching the information about all the countries that speak that language
    fetch(countryLink)
    .then(function (response) {
        //logging the status of the response and processing the response
        console.log(response.status);
        response.json()
        .then(function (data) {

            //logging the data
            console.log(data);

                 //Error Modal for wrong input
                 if (response.status !== 200) {
                    langmodal.style.display = "block";
                }

            //creating a ul element that will contain the list of countries
            var ul = document.createElement('ul')

            //looping through the data and adding the names of the countries to the list as buttons
            for (var i = 0; i < data.length; i++) {
                var li = document.createElement('button');

                //adding the tex and class for each button
                li.textContent = data[i].name.common;
                li.classList.add(li.textContent.replaceAll(' ', '-'));
                li.classList.add('btn');
                li.classList.add('btn-danger');
                li.classList.add('indigo');
                li.classList.add('searched-btn');
                li.setAttribute('name', li.textContent);
                console.log(li.textContent.replaceAll(' ', '-'));

                //adding the button to the ul element
                ul.appendChild(li);
            }

            //adding an event listener to the buttons so the user can click on the button and see results for searching for that country
            ul.addEventListener('click', function(event) {
                console.log(event.target.classList[0]);
                countrySearch(event, event.target.getAttribute('name'));
            })

            //adding the countryinfo class
            ul.classList.add('countryinfo')

            //adding the ul element to the container in the html file
            resultContainer.appendChild(ul);
        })
    })
}

function regionSearch(event, userInput) {
    event.preventDefault();

    //deleting existing contents if there are existing elements within the container
    if (resultContainer.childElementCount >= 1) {
        var countryCont = document.querySelector('.countryinfo');

        resultContainer.removeChild(countryCont);
    }

    //country language link
    var countryLink = 'https://restcountries.com/v3.1/region/' + userInput;

    //fetching the information about all the countries that speak that language
    fetch(countryLink)
    .then(function (response) {
        //logging the status of the response and processing the response
        console.log(response.status);
        response.json()
        .then(function (data) {

            //logging the data
            console.log(data);

                 //Error Modal for wrong input
                 if (response.status !== 200) {
                    contmodal.style.display = "block";
                    }

            //creating a ul element that will contain the list of countries
            var ul = document.createElement('ul')

            //looping through the data and adding the names of the countries to the list as buttons
            for (var i = 0; i < data.length; i++) {
                var li = document.createElement('button');

                //adding the tex and class for each button
                li.textContent = data[i].name.common;
                li.classList.add(li.textContent.replaceAll(' ', '-'));
                li.classList.add('btn');
                li.classList.add('btn-danger');
                li.classList.add('indigo');
                li.classList.add('searched-btn');
                li.setAttribute('name', li.textContent);
                console.log(li.textContent.replaceAll(' ', '-'));

                //adding the button to the ul element
                ul.appendChild(li);
            }

            //adding an event listener to the buttons so the user can click on the button and see results for searching for that country
            ul.addEventListener('click', function(event) {
                console.log(event.target.classList[0]);
                countrySearch(event, event.target.getAttribute('name'));
            })

            //adding the countryinfo class
            ul.classList.add('countryinfo')

            //adding the ul element to the container in the html file
            resultContainer.appendChild(ul);
        })
    })
}

//render the country search results
function renderLocation(name, currency, continent, capital) {
    //container variable
    var ul = document.createElement('ul');

    //variables for the information
    var nameText = 'NAME:   ' + name;
    var currencyText = 'CURRENCY:    ' + currency;
    var continentText = 'CONTINENT:  ' + continent;
    var capitalText = 'CAPITAL:     ' + capital;

    //creating an array to contain the elements
    var cardContents = [nameText, currencyText, continentText, capitalText];

    //looping throught the array and adding the contents to elements to be displayed
    for (var i = 0; i < cardContents.length; i++) {
        var li = document.createElement('li');

        li.textContent = cardContents[i];
        li.classList.add('resultText');

        ul.appendChild(li);
    }

    //adding the countryinfo class
    ul.classList.add('countryinfo');
    
    //adding the ul element to the result container
    resultContainer.appendChild(ul);
}

//storing the searched countries to the localstorage
function storeSearches() {
    localStorage.setItem('searchedCountries', JSON.stringify(searched));
    
}

function renderSearched() {
    var ul = document.createElement('ul')

    //deleting existing contents if there are existing elements within the container
    if (previousSearch.childElementCount >= 1) {
        var prev = document.querySelector('.prevCountries');

        previousSearch.removeChild(prev);
    }

    //looping through the searched countries
    for (var i = 0; i < searched.length; i++) {
        //creating a button element for each country
        var li = document.createElement('button');

        //adding the text and class for each button
        li.textContent = searched[i];
        li.classList.add(searched[i].replaceAll(' ', '-'));
        li.classList.add('btn');
        li.classList.add('btn-danger');
        li.classList.add('indigo');
        li.classList.add('searched-btn');
        li.setAttribute('name', li.textContent);
        

        //adding the button to the ul container
        ul.appendChild(li);
    }

    //adding an event listener so the user can click the searched country and see their results
    ul.addEventListener('click', function(event) {
        console.log(event.target.classList[0].replaceAll('-', ' '));
        countrySearch(event, event.target.getAttribute('name'));
    })
    ul.classList.add('prevCountries');

    //adding the ul container for the searched countries
    previousSearch.appendChild(ul);
}

search.addEventListener('click', function() {

    var selectBox = document.getElementById('select-criteria');
    var searchType = selectBox.value;

    //checks the search type to know what to search for from the api
    if (searchType == 3) { 
        currencySearch(event, userInput.value);
    }else if (searchType == 0) {
        countrySearch(event, userInput.value);
    }else if (searchType == 2) {
        languageSearch(event, userInput.value);
    }else if (searchType == 1) {
        regionSearch(event, userInput.value);
    }
});

renderSearched();