const amount = document.querySelector('#amount');
const fromCurrency = document.querySelector('#from-currency');
const toCurrency = document.querySelector('#to-currency');
const button = document.querySelector('#convert');
const result = document.querySelector('#result');

function handleSelectedText(selection) {
    if (selection.selectedIndex === -1) {
        return null;
    }
    return selection.options[selection.selectedIndex].text;
}

// Convert currency when button is clicked
async function convertCurrency() {
    const currencyFrom = handleSelectedText(fromCurrency);
    const currencyTo = handleSelectedText(toCurrency);
    const response = await fetch(
        `https://open.er-api.com/v6/latest/${currencyFrom}`
    );
    const data = await response.json();
    const exchangeRate = await data.rates[currencyTo];
    const totalAmount = amount.value;

    return (totalAmount * exchangeRate).toFixed(2);
}

// Displaying the currency selections
async function loadCurrencies(currency = 'EUR') {
    let response, data;
    try {
        response = await fetch(`https://open.er-api.com/v6/latest/${currency}`);
        data = await response.json();
    } catch (err) {
        console.log(err);
        return;
    }

    // Handle errors with data
    if (!data || !data.rates) {
        console.log('Invalid data returned from API');
        return;
    }

    // Populate options for select elements
    fromCurrency.innerHTML = '';
    toCurrency.innerHTML = '';
    const currencies = Object.keys(data.rates);
    currencies.forEach(currency => {
        const option = document.createElement('option');
        option.value = data.rates[currency];
        option.text = currency;
        fromCurrency.appendChild(option);

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.text = currency;
        toCurrency.appendChild(option2);
    });

    toCurrency.value = 'DKK';
}

loadCurrencies();

fromCurrency.addEventListener('change', () => {
    const currency = handleSelectedText(fromCurrency);
    loadCurrencies(currency);
});

button.addEventListener('click', async e => {
    e.preventDefault();
    const convertedAmount = await convertCurrency();

    if (convertedAmount === '0.00') {
        result.innerText = 'Enter an amount!';
    } else {
        result.innerText =
            convertedAmount + ' ' + handleSelectedText(toCurrency);
    }
});
