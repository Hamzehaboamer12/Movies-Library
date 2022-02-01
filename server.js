'use strict';



require('dotenv').config();
const express=require('express');
const cors = require('cors');
const dataMovie =require('./movie Data/data.json');
const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);

//create server
const server=express();
server.use(cors());


server.get('/', handelData);
server.get('/favorite',handelfavorite);
server.post('/addMovie',addmyFavMoviesHandler);
server.get('/myFavMovies',myFavMoviesHandler);
server.use('*',handelNotFound);
server.use(handelservererror);





function Movei (title , poster_path , overview){
this.title = title;
this.poster_path = poster_path;
this.overview = overview;
}

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
    console.log("my server is listining to port 4000");
})

})
