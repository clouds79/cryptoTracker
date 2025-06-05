async function getCoins() {

    try {
        const res = await fetch('https://api.coinranking.com/v2/coins', {
            headers:
            {
                'Content-Type': 'application/json',
                'x-access-token': 'coinranking8e215f68bb6c5184862c98f51b6ef4131fa2a993f8f19339',
                'Access-Control-Allow-Origin': '*'
            }
        });
        var jsonform = await res.json();
        const coins = jsonform.data.coins.slice(0, 100);
        const tableBody = document.getElementById("coinsTable").getElementsByTagName("tbody")[0];

        tableBody.innerHTML = "";
        coins.forEach(coin => {
            const row = document.createElement('tr');
            const imgSrc = coin.iconUrl;
            let marketCap = coin.marketCap;
            let marketCapDisplay = ``;
            if (marketCap >= 1000000000000) {
                marketCap = Math.round(coin.marketCap / 10000000000) / 100;
                marketCapDisplay = `${marketCap} trillion`;
            }
            else if (marketCap >= 1000000000) {
                marketCap = Math.round(coin.marketCap / 10000000) / 100;
                marketCapDisplay = `${marketCap} billion`;
            }
            else if (marketCap / length > 1000000) {
                marketCap = Math.round(coin.marketCap / 10000) / 100;
                marketCapDisplay = `${marketCap} million`;
            }
            else {
                marketCapDisplay = marketCap
            }                    ;

            const price = roundoff(coin.price);
            const btcPrice = roundoff(coin.btcPrice);
           
            row.innerHTML = `<td>${coin.name}</td>
                             <td>$${marketCapDisplay}</td>
                             <td>${coin.uuid}</td>
                             <td>$${price}</td>
                             <td>$${coin.btcPrice}</td>
                             `
        tableBody.appendChild(row);
        console.log(jsonform.data.coins);
    });
}

    catch (error) {
        console.log(error);
    }

}

function roundoff( x) {
    x *= 100;
    x = Math.round(x);
    x /= 100;
    return x;

}
getCoins();
//setInterval(getCoins,10000);

document.getElementById("searchButton").addEventListener('click', function () {
    try {
        const query = document.getElementById("searchInput").value.toLowerCase();
        const rows = document.querySelectorAll("#coinsTable tbody tr");

        rows.forEach(row => {
            const coinName = row.querySelector("td").textContent.trim();
            if (coinName.toLowerCase().includes(query)) {
                row.classList.add("highlight");
            }
            else {
                row.classList.remove("highlight");
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
      