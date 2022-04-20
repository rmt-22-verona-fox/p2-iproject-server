if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
  }
const express = require("express");
const app = express();
const axios = require("axios")
const cors = require("cors");
const router = require("./routes/index")
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)

// const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTAwOTdlMjM2MDk4Yjk2Y2Y3ZGExNTc4YjUzNGQ5OCIsInN1YiI6IjYyNWZjMWM0ZTYxZTZkMDBhN2ExNTEyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W4NYaqsvmehu1gJtiKNZJbIWeaYMhMCuvcA-8cJeX6A'
// // app.get('/popular movies',async (req,res,next) =>{
//     try {
//         const response = await axios({
//             url: 'https://api.themoviedb.org/3/movie/popular?api_key=e10097e236098b96cf7da1578b534d98&language=en-US&page=1',
//             headers: {
//                 Authorization: `Bearer ${token}` 
//             }
//         })
 
//       let data = response.data.results.map(el =>{
//           let obj = {
//               title: el.title,
//               imageUrl: el.poster_path,
//               synopsis: el.overview,
//               rating: el.vote_average
//           }
//           return obj
//       })

//       res.status(200).json(data)

//     } catch (err) {
//         console.log(err);
//     }

// })

module.exports = app;
