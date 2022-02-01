'use strict';




const express=require('express');
const cors = require('cors');
const dataMovie =require('./movie Data/data.json');

//create server
const server=express();
server.use(cors());


server.get('/', handelData);
server.get('/favorite',handelfavorite);
server.get('*',handelNotFound);
server.use(handelservererror);



function Movei (title , poster_path , overview){
this.title = title;
this.poster_path = poster_path;
this.overview = overview;
}
function handelservererror (error,req , res){

    const err ={
        status : 500,
        message : error
    }
 
      res.status(500).send(err);
 
 }
function handelNotFound(req , res){
    res.status(404).send('This page does not exist :/ ');
}
function handelservererror(req , res){
    res.status(500).send('This page have server error :/ ');
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





server.listen(4000,()=>{
    console.log("my server is listining to port 4000");
})