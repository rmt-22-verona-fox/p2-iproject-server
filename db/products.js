const axios = require("axios");

const options = {
    method: 'GET',
    url: 'https://the-sneaker-database.p.rapidapi.com/sneakers',
    params: { limit: '100' },
    headers: {
        'X-RapidAPI-Host': 'the-sneaker-database.p.rapidapi.com',
        'X-RapidAPI-Key': '6eb8efa9bbmsh79c36eeb2171719p13b54ajsna819efc9f387'
    }
};


function getSneakers() {
    return axios.request(options)
    let total = response.data.count
    let listSneakers = response.data.results
    console.log(listSneakers)
}

module.exports = getSneakers