'use strict';



require('dotenv').config();
const express=require('express');
const cors = require('cors');
const dataMovie =require('./movie Data/data.json');

const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);

const axios = require('axios');

const PORT = process.env.PORT;


//create server
const server=express();
server.use(cors());


server.get('/', handelData);
server.get('/favorite',handelfavorite);

server.post('/addMovie',addmyFavMoviesHandler);
server.get('/myFavMovies',myFavMoviesHandler);
server.use('*',handelNotFound);

server.get('/trending',handeltrending);
server.get('/search',handelsearch);

server.get('*',handelNotFound);

server.use(handelservererror);

// server.use(errorHandler)


let url =`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.APIKEY}&language=en-US`;
let numberOfRecipes=2;
let userSearch = "The Tomorrow War";
 let userSearch2 = "The 355";


function handelservererror (error,req , res){

   const err ={
       status : 500,
       message : error
   }

     res.status(500).send(err);




function Movei (title , poster_path , overview){
this.title = title;
this.poster_path = poster_path;
this.overview = overview;
}

}

function Movei (id , title , release_date , poster_path , overview){
    this.id = id;    
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
    }
   
   
   
function handelsearch(req , res){
    // let newArr = [];
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&number=${numberOfRecipes}&query=${userSearch}`;
    let url2 = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&number=${numberOfRecipes}&query=${userSearch2}`;

    axios.get(url)
    .then(results=>{
        // console.log(result.data.recipes);
        let movies = results.data.results.map(val =>{
            return new Movei(val.id, val.title, val.release_date, val.poster_path, val.overview);
        });
        res.status(200).json(movies);  
     }).catch(err=>{
        handelservererror (error,req , res);

    })

}

    

function handeltrending(req , res){

    let newArr = [];
    axios.get(url)
     .then((results)=>{
         
        // let movie = results.data.movie.map(val =>{
        //     return new Movei(val.id, val.title, val.release_date, val.poster_path, val.overview);
        results.data.results.forEach(val =>{
                 newArr.push(new Movei(val.id, val.title, val.release_date, val.poster_path, val.overview));
        
        });
        // console.log(result.data.movie);
      
         res.status(200).json(newArr);

    }).catch((err)=>{
        handelservererror (error,req , res);

    })
}

function handelservererror (error,req , res){


function addmyFavMoviesHandler(req,res){
    const movies = req.body;
   //  console.log(movies);
    let sql = `INSERT INTO movie(title,poster_path,overview) VALUES ($1,$2,$3,) RETURNING *;`
    let values=[movies.title , movies.poster_path , movies.overview];
    client.query(sql,values).then(data =>{
        res.status(200).json(data.rows);
    }).catch(error=>{
        handelservererror(error,req,res)
    });
  }

  function myFavMoviesHandler(req,res){
    let sql = `SELECT * FROM movie;`;
    client.query(sql).then(data=>{
       res.status(200).json(data.rows);
    }).catch(error=>{
        handelservererror(error,req,res)
    });
}





function handelservererror (error,req,res){
    const err = {
         status : 500,
         messgae : error
     }
    //  res.status(500).send(err);
    //  res.status(500).send(err);
    res.status(500).send(err);
 }

 
function handelNotFound(req , res){
    res.status(404).send('This page does not exist :/ ');
}
// function handelservererror(req , res){
//     res.status(500).send('This page have server error :/ ');
// }
=======
=======
  // result.data.Movei.forEach(Movei =>{
        //     newArr.push(new Movei(Movei.id,recipe.title,Movei.release_date,Movei.poster_path,Movei.overview));
        // })


function handelNotFound(req , res){
    res.status(404).send('This page does not exist :/ ');
}





function handelData(req,res){
    // let movie=[];
    let obj;
    obj= new Movei(dataMovie.title, dataMovie.poster_path, dataMovie.overview);
    return res.status(200).json(obj);

    
}

function handelfavorite(req,res){
    res.status(200).send("Welcome to Favorite Page :) ");
}





client.connect().then(()=>{
server.listen(4000,()=>{


server.listen(PORT,()=>{

    console.log("my server is listining to port 4000");
})

})
