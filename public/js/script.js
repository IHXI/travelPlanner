// Include api for currency change
console.log('hi')

const api = `https://v6.exchangerate-api.com/v6/6ffe9dfdb4c1d7f58689ddbc/latest/USD`;

// For selecting different controls
let search = document.querySelector(".searchBox");
let convert = document.querySelector(".convert");
let fromCurrecy = document.querySelector(".from");
let toCurrecy = document.querySelector(".to");
let finalValue = document.querySelector(".finalValue");
let finalAmount = document.getElementById("finalAmount");
let resultFrom;
let resultTo;
let searchValue;

// Event when currency is changed
fromCurrecy.addEventListener('change', (event) => {
    resultFrom = `${event.target.value}`;
});

// Event when currency is changed
toCurrecy.addEventListener('change', (event) => {
    resultTo = `${event.target.value}`;
});

search.addEventListener('input', updateValue);

// Function for updating value
function updateValue(e) {
    searchValue = e.target.value;
}

// When user clicks, it calls function getresults 
convert.addEventListener("click", getResults);

// Function getresults
function getResults() {
    fetch(`${api}`)
        .then(currency => {
            if (!currency.ok) throw new Error(`HTTP error: ${currency.status}`)
            // console.log(currency.json())
            return currency.json();
        }).then(displayResults);
}

// Display results after conversion
function displayResults(currency) {
    console.log(currency)
    let fromRate = currency.conversion_rates[resultFrom];
    let toRate = currency.conversion_rates[resultTo];
    finalValue.innerHTML =
        ((toRate / fromRate) * searchValue).toFixed(2);
    finalAmount.style.display = "block";
}

// When user click on reset button
function clearVal() {
    window.location.reload();
    document.getElementsByClassName("finalValue").innerHTML = "";
};