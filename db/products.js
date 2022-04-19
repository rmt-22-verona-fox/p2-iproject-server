const axios = require("axios");

const options = {
    method: 'GET',
    url: 'https://the-sneaker-database.p.rapidapi.com/sneakers',
    params: { limit: '100' },
    headers: {
        'X-RapidAPI-Host': 'the-sneaker-database.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.X_RapidAPI_Key
    }
};


function getSneakers() {
    return axios.request(options)
    let total = response.data.count
    let listSneakers = response.data.results
    console.log(listSneakers)
}

module.exports = getSneakers