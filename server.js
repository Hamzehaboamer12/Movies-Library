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

server.use(express.json());


server.get('/', handelData);
server.get('/favorite',handelfavorite);
server.post('/addMovie',addmyFavMoviesHandler);
server.get('/getMovies',getMoviesHandler);

server.get('/getMovie/:id',getMoviesHandlerid);
server.put('/updateMovie/:id',updateMovieHandler); 
server.delete('/deleteMovie/:id',deleteMovieHandler);
server.use('*',handelNotFound);
server.use(handelservererror);


function Movei (title , poster_path , overview){
this.title = title;
this.poster_path = poster_path;
this.overview = overview;
}


function updateMovieHandler (req,res){
    const id = req.params.id;
    //console.log(req.params.id);
    const movie = req.body;
    // console.log(movie);
    console.log(movie);
    const sql = `UPDATE movie SET title =$1, poster_path = $2, overview=$3  WHERE id=$4 RETURNING *;`;
    let values=[movie.title , movie.poster_path , movie.overview,id];
    client.query(sql,values).then(data=>{
        res.status(200).json(data.rows);
        // res.status(204)
    }).catch(error=>{
        handelservererror(error,req,res)
    });
}




function deleteMovieHandler(req,res){
    const id = req.params.id;
    const sql = `DELETE FROM movie WHERE id=${id};` 
    // DELETE FROM table_name WHERE condition;

    client.query(sql).then(()=>{
        res.status(200).send("The Recipe has been deleted");
        // res.status(204).json({});
    }).catch(error=>{
        handelservererror(error,req,res)
    });
}




function addmyFavMoviesHandler(req,res){
   const movies = req.body;
     //console.log(movies);
    let sql = `INSERT INTO movie(title,poster_path,overview) VALUES ($1,$2,$3) RETURNING *;`
    let values=[movies.title || '', movies.poster_path||'' , movies.overview||''];
    client.query(sql,values).then(data =>{
        res.status(200).json(data.rows);
    }).catch(error=>{
        handelservererror(error,req,res)
    });
  }

  function getMoviesHandler(req,res){
    let sql = `SELECT * FROM movie;`;
    client.query(sql).then(data=>{
       res.status(200).json(data.rows);
    }).catch(error=>{
        handelservererror(error,req,res)
    });
}



function getMoviesHandlerid(req,res){
    const id = req.params.id;
    let sql = `SELECT * FROM movie WHERE id=${id} ;`;
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
