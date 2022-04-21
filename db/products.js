const axios = require("axios");


function getSneakers(options) {
    return axios.request(options)
    let total = response.data.count
    let listSneakers = response.data.results
    console.log(listSneakers)
}

module.exports = getSneakers