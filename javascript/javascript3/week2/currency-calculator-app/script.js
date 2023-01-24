const amount = document.querySelector('#amount');
const fromCurrency = document.querySelector('#from-currency');
const toCurrency = document.querySelector('#to-currency');
const button = document.querySelector('#convert');
const result = document.querySelector('#result');

loadCurrencies();

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
  return (amount.value * exchangeRate).toFixed(2);
}

async function loadCurrencies(currency = 'EUR') {
  try {
    fromCurrency.innerHTML = '';
    toCurrency.innerHTML = '';
    const response = await fetch(
      `https://open.er-api.com/v6/latest/${currency}`
    );
    const data = await response.json();
    const currencies = Object.keys(data.rates);
    // Populate options for select elements
    currencies.forEach((currency) => {
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
  } catch (err) {
    console.log(err);
  }
}

fromCurrency.addEventListener('change', async () => {
  const currency = handleSelectedText(fromCurrency);
  loadCurrencies(currency);
});

button.addEventListener('click', async (e) => {
  e.preventDefault();
  const convertedAmount = await convertCurrency();
  result.innerText = convertedAmount;
});
