document.getElementById('buyButton').addEventListener('click', async function () {
    const phone = document.getElementById('phone').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const responseDiv = document.getElementById('response');

    if (!phone || !amount) {
        responseDiv.textContent = 'Please enter both phone number and amount.';
        return;
    }

    try {
        responseDiv.textContent = 'Processing payment... Please wait.';

        const res = await fetch('http://localhost:3000/stkpush', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'pk_test_0eee8a8f43a1eb32630d17d480d84def4362fd33'
            },
            body: JSON.stringify({
                phone: phone,
                amount: amount
            })
        });

        const data = await res.json();

        if (data.ResponseCode === "0") {
            responseDiv.textContent = 'STK Push sent to your phone. Complete payment to buy the product.';
        } else {
            responseDiv.textContent = 'Payment failed: ' + (data.ResponseDescription || 'Unknown error');
        }

    } catch (error) {
        console.error('Error:', error);
        responseDiv.textContent = 'Failed to process payment. Check connection.';
    }
});
