document.addEventListener("DOMContentLoaded", function () {
    const currencySelect = document.getElementById('currency-select');
    const prices = document.querySelectorAll('.price');

    currencySelect.addEventListener('change', function () {
        const selectedCurrency = this.value;
        prices.forEach(priceElement => {
            const price = priceElement.getAttribute(`data-price-${selectedCurrency.toLowerCase()}`);
            priceElement.textContent = getCurrencySymbol(selectedCurrency) + price;
        });
    });

    function getCurrencySymbol(currency) {
        switch (currency) {
            case 'USD':
                return '$';
            case 'EUR':
                return '€';
            case 'GBP':
                return '£';
            default:
                return '$';
        }
    }
});
