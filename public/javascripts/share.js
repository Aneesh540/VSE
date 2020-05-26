print = console.log;
const endpoint = "http://localhost:3000/api";
let API_KEY = 'RXGZSQ2O11C8CHSU';

// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + document.cookie.split('access_token=')[1]
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  


let fetch_current_price = async function(){

    let nse_code = document.querySelector('#NSE_code').innerHTML;
    nse_code = nse_code.trim();
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=NSE:${nse_code}&interval=1min&apikey=${API_KEY}`;

    let response = await fetch(url);
    let current_price = await response.json();

    

    	let p = Object.keys(current_price)[1]; //
		p = Object.values(current_price[p]);

		let  [open, high, low, close, volume] = Object.values(p[0]) ;
		
        let intraday = {open : open, high : high, low : low, close : close, volume : volume};
        
        print(intraday);

}


const buy_share = function(){

    let data = { 
            quantity : document.getElementById('quantity').value,
            price : document.getElementById('current_price').innerHTML.trim(),
            code : document.getElementById('stock_code').value,
            name : document.getElementById('stock_name').innerHTML.trim()
    }
    
    let username = document.getElementById('username').value.trim();
    let url = endpoint + `/${username}/buy`;

    
    if(confirm(`place order of ${data.quantity} shares`)){
        postData(url, data)
        .then(result => {
            console.log(result);
            alert(`TRANSACTION COMPLETED PRICE:${data.price} QUANTITY:${data.quantity}`);


        })
        .catch(err => alert('Not able to complete transaction'));
    }

}


let x = document.querySelectorAll('#all_list input');
x.forEach( item => {print(item.id); print(item.value)});