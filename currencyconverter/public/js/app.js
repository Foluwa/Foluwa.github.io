
// TO GET ALL THE CURRENCIES AVAILABLE
fetch('https://free.currencyconverterapi.com/api/v5/currencies')
    .then(response=> {
       return response.json();
    }).then(data =>{

    const currencyArray = Object.entries(data.results);
    let mainMap = new Map();
    for(const currency of currencyArray){
        let currencyName = currency[1].currencyName;
        let currencyId = currency[1].id;
        mainMap.set(currency[1].id, currency[1].currencyName);
    }
    return mainMap;
    })

    .then(currencyMap =>{
        firstCurrency = document.getElementById('current_currency');
        secondCurrency = document.getElementById('equivalent_currency');

        for (const curr of currencyMap) {
            let[id, name] = curr;
           firstCurrency.add(new Option(name, id));
           secondCurrency.add(new Option(name, id));   
        }
    })
    .catch(err => {
        console.log('Encountered an error .', err);
    })

//CONSUMING THE API
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
        let rate = queryResult[0][1].val;
        return rate;
        ///////////////////////////////////////
    }).then(rate => {
        let amount_Field = document.getElementById('current_amount').value;
        let converted_Value = rate * amount_Field;
        document.getElementById('equivalent_amount').value = converted_Value;
    })
});

//REGISTRING SERVICE WORKER
  if ('serviceWorker' in navigator) {
       navigator.serviceWorker.register('https://foluwa.github.io/currencyconverter/public/js/sw.js').then((registration) => {
        console.log('Registration successful, scope is:', registration.scope);
       })
       .catch((error) => {
          console.log('Service worker registration failed, error:', error);
       });

  }
//// CHECKING IF INDEXEDDB IS SUPPORTED
if (!window.indexedDB) {
    window.alert('Your browser does not support a stable version of IndexedDB.');
}
else {
  console.log("Your browser supports IndexedDB.");
}
const dbPromise = indexedDB.open('currencyConverter', 3, (upgradeDb) => {
    switch (upgradeDb.oldVersion) {
        case 0:
            upgradeDb.createObjectStore('countries', {
                keyPath: 'currencyId'
            });
        case 1:
            let countriesStore = upgradeDb.transaction.objectStore('countries');
            countriesStore.createIndex('country', 'currencyName');
            countriesStore.createIndex('country-code', 'currencyId');
        case 2:
            upgradeDb.createObjectStore('conversionRates', {
                keyPath: 'query'
            });
            let ratesStore = upgradeDb.transaction.objectStore('conversionRates');
            ratesStore.createIndex('rates', 'query');
    }
});
document.addEventListener('DOMContentLoaded', () => {
    
    //FETCHING CURRENCIES
    fetch('https://free.currencyconverterapi.com/api/v5/countries')
        .then(res => res.json())
        .then(res => {
            Object.values(res.results).forEach(country => {
                dbPromise.then(db => {
                    const countries = db.transaction('countries', 'readwrite').objectStore('countries');
                    countries.put(country);
                })
            });
            dbPromise.then(db => {
                const countries = db.transaction('countries', 'readwrite').objectStore('countries');
                const countriesIndex = countries.index('country');
                countriesIndex.getAll().then(currencies => {
                    //
                })
            })
        }).catch(() => {
            dbPromise.then(db => {
                const countries = db.transaction('countries').objectStore('countries');
                const countriesIndex = countries.index('country');
                countriesIndex.getAll().then(currencies => {
                    // 
                })

            });
        });
});
