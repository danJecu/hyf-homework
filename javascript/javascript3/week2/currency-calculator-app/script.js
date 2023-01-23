const amount = document.querySelector('#amount');
const fromCurrency = document.querySelector('#from-currency');
const toCurrency = document.querySelector('#to-currency');
const button = document.querySelector('#convert');

loadCurrencies();

// Convert currency when button is clicked
function convertCurrency() {
  console.log(`${amount}-${fromCurrency}-${toCurrency}`);
}

async function loadCurrencies(currency = 'DKK') {
  try {
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

    toCurrency.value = 'EUR';
  } catch (err) {
    console.log(err);
  }
}

fromCurrency.addEventListener('change', () => {
  loadCurrencies();
});
