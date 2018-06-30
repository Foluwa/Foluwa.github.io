// TO GET ALL THE CURRENCIES AVAILABLR
fetch('https://free.currencyconverterapi.com/api/v5/currencies')
    .then(response=> {
       return response.json();
    }).then(data =>{
    //   console.log(data);
    //    const currencies = data.results;
    //   for( const currency in currencies){
    //      console.log(currency);
          
    //   }  
 
    // console.log(Object.entries(data.results));
    const currencyArray = Object.entries(data.results);
    let mainMap = new Map();
    for(const currency of currencyArray){
     //   console.log(currency);
        let currencyName = currency[1].currencyName;
       // let currencySymbole = currency[1].currencySymboll
        let currencyId = currency[1].id;

        mainMap.set(currency[1].id, currency[1].currencyName);
        
       // currencies.add(currencyId, currencyName);
        // console.log(currencyId);
        // console.log(currencyName);
        // console.log(mainMap.size);   
    }
    return mainMap;
    })
    .then(currencyMap =>{
        firstCurrency = document.getElementById('current_currency');
        secondCurrency = document.getElementById('equivalent_currency');
        // console.log(currencyMap.size);
        for (const curr of currencyMap) {
            let[id, name] = curr;
           firstCurrency.add(new Option(name, id));
           secondCurrency.add(new Option(name, id));   
        }
    })
    .catch(err => {
        console.log("Encountered an error .", err);
    })


const form_element = document.getElementById('currency-form');
form_element.addEventListener('submit', event => {
  event.preventDefault();
  let currentField = document.getElementById('current_currency').value;
  let equivalentField = document.getElementById('equivalent_currency').value;
   urlQuery =  'https://free.currencyconverterapi.com/api/v5/convert?q='
   qString = urlQuery+currentField+'_'+equivalentField;
    fetch(qString)
    .then(response =>{
        return response.json();
    }).then(data => {
        // console.log(data);
        const queryResult = Object.entries(data.results);
        //  console.log(queryResult);
        // console.log(queryResult[0][1].val);
        let rate = queryResult[0][1].val;
        return rate;
        //////////////
    }).then(rate => {
        let amount_Field = document.getElementById('current_amount').value;
        let converted_Value = rate * amount_Field;
        document.getElementById('equivalent_amount').value = converted_Value;
    })
});

//SERVICE WORKER
if ('serviceWorker' in navigator) { //currencyconverter/public/js/sw.js   /try to use th file system fir this dont not go to https
    navigator.serviceWorker.register('https://foluwa.github.io/currencyconverter/public/js/sw.js').then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function(error) {
      console.log('Service worker registration failed, error:', error);
    });
  }
