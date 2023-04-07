var userText = document.querySelector('#country-input');
var searchBtn = document.querySelector('#search-btn');

var countrylink = "";
    
searchBtn.addEventListener('click', function(){

    var searchText = userText.value;
    fetchInfo(searchText);

    function fetchInfo(searchText) {
        fetch(countrylink,
            {
                mode: 'no-cors',
            }).then(function(data) {
                console.log(data);
        })
    }
})

$(document).ready(function() {
    var criteriaSelection = $('select').find(':selected').val();

    if (criteriaSelection === 1) {
        nameSearch();
        return;
    }
    
    if (criteriaSelection === 2) {
        continentSearch();
        return;
    }
    
    if (criteriaSelection === 3) {
        languageSearch();
        return;
    }

    var nameSearch = function() {
        countrylink.val = 'https://restcountries.com/v3.1/name/' + userText + '?fullText=true';
    }

    var continentSearch = function() {
        countrylink.val = 'https://restcountries.com/v3.1/region/' + userText;
    }

    var languageSearch = function() {
        countrylink.val = 'https://restcountries.com/v3.1/lang/' + userText;
    }
})

    
