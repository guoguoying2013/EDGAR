### EDGAR

## About The Project
This project is to mimic some of the functions of [EDGAR](https://www.sec.gov/edgar/searchedgar/companysearch.html). This project allows any user to look up a company by trading symbol(ex: AAPL) and obtain a list of available filings associated with that company. Users would be able to visit the HTML version of a specific filing. 

### Built With

* [React](https://reactjs.org)
* [Express](http://expressjs.com/)
* [Axios](https://www.npmjs.com/package/axios)
* [MySQL](https://www.mysql.com/)
* [Cheerio](https://www.npmjs.com/package/cheerio)

### Demo
![til](./demo.gif)

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/)

### Installation

1. Install NPM packages
   ```sh
   npm install
   ```
2. Create mysqlLoginInfo.js at folder database, then enter your MySQL username and password as in the example code below
   ```JS
   module.exports = { username: yourUsername, password: yourPassword };
   ```
3. Login MySQL shell and create a database called sdgar
   ```sh
   mysql -u username -p password
   CREATE DATABASE sdgar;
   ```
4. Created webpack bundle
    ```sh
   npm run build
   ```
5. Start server
   ```sh
   npm start
   ```
6. If you want to see test, run the command below
   ```sh
   npm run test
   ```

