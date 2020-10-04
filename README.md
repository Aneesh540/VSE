# Virtual Stock Exchange :ox: :bear:
> Trade in NSE (national stock exchange) listed companies without putting actual money into the market

## About it
1. **In simple words, it is like a stock broker**
2. **It buy and sell shares for you, keep track of you Demat account BUT you don't need to invest actual money**
3. **To check whether one is making profit or losing money if he does transactions in real life**

> For those who are reluctant to play with bulls & bears


## Built With

* [Node.js](https://github.com/nodejs/node) - Javscript runtime environment
*  [Express](https://github.com/expressjs/express) - Node.js web framework
* [MongoDB](https://github.com/mongodb/mongo) - MongoDB - NoSQL database

## Installation
``` 
1. clone this repo
2. npm install
```
that's it :grin:

## Overview of project

* This app has 2 seperate entities
1. The core of the app is an independent ```REST-API``` service which handles all the logic . Check ```api/``` folder
2. Frontend part which calls ```REST-API``` over HTTP for its operations. Check ```views/``` ```public/``` ```routes/``` folders

### For API documentation visit [this](https://gist.github.com/Aneesh540/5cece956a7846057d2af05adff659509) github gist

## App SS

### Demat account
![demat](https://1.bp.blogspot.com/-PcIsqmY3wfc/X3n8BcqtufI/AAAAAAAAAQM/wunP7PVPEh4p0cbMz4lxhwmqZwdR0T2TgCLcBGAsYHQ/s1648/83335181-7fd44c80-a2c8-11ea-8e03-ebf03a6f9490.gif)


### Particular share detail
![shares](https://1.bp.blogspot.com/-WOu0e8Pvz8g/X3n8BdP447I/AAAAAAAAAQQ/cbO80US7w3cFDEZ0rAUUM8jTYmA_ep3bwCLcBGAsYHQ/s1637/83335185-82cf3d00-a2c8-11ea-8f0a-246b18c704fb.gif)

### Search NSE companies
![searches](https://1.bp.blogspot.com/-3tS8bil6EVA/X3n8BRi0sDI/AAAAAAAAAQU/dzd95m3eNBsdL3SOvz1vWP3ulv4HKfuAgCLcBGAsYHQ/s1884/output-onlinepngtools.gif)

## Acknowledgments
* **Alpha Vantage** for providing free API on realtime stock market data (even you can put any random strings as APIKEY )

