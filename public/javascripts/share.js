print = console.log;
const endpoint = "http://localhost:3000/api";


let get_cookie = function(name){

    let cookie_list = document.cookie.split(';');
    
    for(let i=0; i<cookie_list.length; i++){

        let COOKIE = cookie_list[i].trim();

        let [key, value] = COOKIE.split('=');

        if(key === name){
            return value;
        }
    }
}


// Example POST method implementation:
async function postData(url, data) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + get_cookie('access_token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  


let fetch_current_price = async function(name){

    let nse_code = document.querySelector('#NSE_code').innerHTML;
    let KEY = Math.random().toString(36).substring(2); // generate a random api key
    nse_code = nse_code.trim();
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=NSE:${nse_code}&interval=1min&apikey=${KEY}`;
    
    let response = await fetch(url);
    let current_price = await response.json();

    

    	let p = Object.keys(current_price)[1]; //
		p = Object.values(current_price[p]);

        p = Object.values(p[0])[0]; // current price of stock
        

        let display = document.querySelector('#current_price_display');
        let cp = document.querySelector('#current_price');

        cp.innerHTML = p;

        display.innerHTML = `&#8377 ${p} <span class="badge badge-success"> +NA (NA %)</span>`;
        
        // UPDATING UP OR DOWN WRT PREVIOUS CLOSING
        KEY = Math.random().toString(36).substring(2); 
        const url2 = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NSE:${nse_code}&apikey=${KEY}`;
       
        response = await fetch(url2);
        current_price = await response.json();

        let q = Object.keys(current_price)[1]; //
        q = Object.values(current_price[q]);
        q = Object.values(q[0]);
        let [open, high, low, ...restofthing] = q;

        print(p);
        print(q);
        
        open = parseInt(open);

        let colour = 'success'
        

        let up_low = parseInt(p) - parseInt(open);
        print(up_low);
        up_low = up_low.toFixed(3);
        print(up_low);
        let percent = ((p - open)*100)/open;
        percent = percent.toFixed(3);

        if(up_low < 0){
            colour = 'danger'
        }
        
        print(`&#8377 ${p} <span class="badge badge-${colour}"> ${up_low} (${percent} %)</span>`);
        display.innerHTML = `&#8377 ${p} <span class="badge badge-${colour}"> ${up_low} (${percent} %)</span>`;

}

fetch_current_price();

const buy_share = function(){

    let data = { 
            quantity : document.getElementById('quantity').value,
            price : document.getElementById('current_price').innerHTML.trim(),
            code : document.getElementById('stock_code').value,
            name : document.getElementById('stock_name').innerHTML.trim()
    }

    if(data.quantity <= 0){
        alert('Quantity should be  a positive number');
        return;
    }
    
    let username = document.getElementById('username').value.trim();
    let url = endpoint + `/${username}/buy`;

    
    if(confirm(`place order of ${data.quantity} shares @ ${data.price} = Rs. ${data.price*data.quantity}`)){
        postData(url, data)
        .then(result => {
            
            alert(`TRANSACTION COMPLETED PRICE:${data.price} QUANTITY:${data.quantity}`);


        })
        .catch(err => alert('Not able to complete transaction'));
    }

}

const sell_share = function(){
    let x = document.querySelectorAll('#share_lot_info input');
    let sell_price = document.querySelector('#current_price').innerHTML;
    let sell_list = []
    let Sum = 0;
    x.forEach( item => {

        if ( parseInt(item.value) > 0){
            sell_list.push({id : item.id, 
                            quantity : item.value,
                            price : sell_price});
            Sum += parseInt(item.value)
        }
    
    });

    if(sell_list.length === 0){
        alert('Select atleast 1');
        return
    }

    if(confirm(`Place order shares ${Sum} @ ${sell_price} = Rs. ${Sum*sell_price}`)){
        let username = document.getElementById('username').value.trim();
        let url = endpoint + `/${username}/sell`;
        let data = sell_list;
        postData(url, data)
        .then(result => {
            
            

            if(result.data.credit_amount === 0){
                alert('Cannot sell, quantity more than available');
                return;
            }
            alert(`transaction completed quantity sold:${Sum}, price:${sell_price}`);


        })
        .catch(err => alert('Not able to complete transaction'));
    }
}
    
    




