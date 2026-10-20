let search = document.getElementById('search');
let sortCap = document.getElementById('sort-cap');
let sortPer = document.getElementById('sort-per');
let table = document.getElementById('crypto-table');
let tbody = document.getElementById('crypto-data');


let api = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

fetch(api)
.then((response)=>{
    return response.json();
})
.then((data)=>{
  renderTable(data);
}).catch((e)=>{
    console.log(e)
})

function renderTable(data){
    tbody.innerHTML = '';
    data.forEach((crypto)=>{
        let row = document.createElement('tr');
        let image = document.createElement('td');
        let name = document.createElement('td');
        let symbol = document.createElement('td');
        let price = document.createElement('td');
        let marketCap = document.createElement('td');
        let change = document.createElement('td');

        image.innerHTML = `<img src="${crypto.image}" alt="${crypto.name}" width="30">`;
        name.innerText = crypto.name;
        symbol.innerText = crypto.symbol.toUpperCase();
        price.innerText = `$${crypto.current_price.toLocaleString()}`;
        marketCap.innerText = `$${crypto.market_cap.toLocaleString()}`;
        change.innerText = `${crypto.price_change_percentage_24h.toFixed(2)}%`;
        row.appendChild(image);
        row.appendChild(name);
        row.appendChild(symbol);
        row.appendChild(price);
        row.appendChild(marketCap);
        row.appendChild(change);
        tbody.appendChild(row);
    })
}

search.addEventListener('input', (e)=>{
    let searchValue = e.target.value.toLowerCase();
    let rows = tbody.getElementsByTagName('tr');    
    for(let i=0; i<rows.length; i++){
        let row = rows[i];
        let name = row.getElementsByTagName('td')[1].innerText.toLowerCase();
        if(name.includes(searchValue)){
            row.style.display = '';
        }else{
            row.style.display = 'none';
        }
    }
})

sortCap.addEventListener('click', ()=>{
    let rows = Array.from(tbody.getElementsByTagName('tr'));
    rows.sort((a, b)=>{
        let capA = parseInt(a.getElementsByTagName('td')[4].innerText.replace(/\$|,/g, ''));
        let capB = parseInt(b.getElementsByTagName('td')[4].innerText.replace(/\$|,/g, ''));
        return capB - capA;
    });
    tbody.innerHTML = '';   
    rows.forEach((row)=>{
        tbody.appendChild(row);
    });
})

sortPer.addEventListener('click', ()=>{
    let rows = Array.from(tbody.getElementsByTagName('tr'));
    rows.sort((a, b)=>{
        let perA = parseFloat(a.getElementsByTagName('td')[5].innerText.replace('%', ''));
        let perB = parseFloat(b.getElementsByTagName('td')[5].innerText.replace('%', ''));
        return perB - perA;
    });
    tbody.innerHTML = '';   
    rows.forEach((row)=>{
        tbody.appendChild(row);
    });
})  