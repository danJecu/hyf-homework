const container = document.getElementById('container');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');

async function getCurrency(currency = 'DKK') {
    const reponse = await fetch(
        `https://open.er-api.com/v6/latest/${currency}`
    );
    const data = await reponse.json();

    Object.keys(data.rates).forEach(curr => {
        const option1 = document.createElement('option');
        option1.value = curr;
        option1.innerText = curr;
        fromCurrency.appendChild(option1);
        const option2 = document.createElement('option');
        option2.value = curr;
        option2.innerText = curr;
        toCurrency.appendChild(option2);
    });
    fromCurrency.value = 'EUR';
    toCurrency.value = 'DKK';
}

getCurrency('EUR');
