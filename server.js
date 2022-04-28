'use strict'

///https://api.themoviedb.org/3/movie/157336/recommendations?api_key=34352ea0b463d37374bea163efd76b36
///34352ea0b463d37374bea163efd76b36
const express = require('express')
const { handle } = require('express/lib/application');
const res = require('express/lib/response');
const recipesData=require("./Move Data/data.json")
const axios=require("axios").default;

const app =express()
const port=3001

app.get("/",handleFirstRoute)
app.get("/favorite",handleFavorate)
app.get("/trending", handleTrending)
app.get("/search", handleSearch)
app.get("/recomandations",handelReco)
app.get("/similar",handelSimilar)

//axios=>git data Moves
function handleTrending(req , res){

let url="https://api.themoviedb.org/3/trending/all/week?api_key=34352ea0b463d37374bea163efd76b36"

axios.get(url)
.then(result=>{
  console.log(result.data.results)
  let moves=result.data.results.map(move=>{
    return new newData2(move.id , move.title , move.release_date,move.poster_path,move.overview);
  })
  res.send(moves)
})
.catch((error)=>{
  console.log(error);
  res.send("Inside catch")
})
}

///Moves Search
function handleSearch(req,res){
  
  let moveName=req.query.moveName;
  let urlSearch=`https://api.themoviedb.org/3/search/movie?api_key=34352ea0b463d37374bea163efd76b36&language=en-US&query=${moveName}`
  axios.get(urlSearch)
  .then(result=>{
    let moves=result.data.results.map(move=>{
      return new searchData(move.id , move.title , move.release_date,move.poster_path,move.overview);
  })
    res.send(moves)
    console.log(moves);
})
  .catch((error)=>{
    console.log(error);
  })
  

}

//Search Moves Recomandation by ID
function handelReco(req,res){
  
  let moveid=req.query.moveID;
  let urlSearchId=`https://api.themoviedb.org/3/movie/${moveid}/recommendations?api_key=34352ea0b463d37374bea163efd76b36`
  axios.get(urlSearchId)
  .then(result=>{
   
    let moves=result.data.results.map(move=>{
      return new searchId(move.id , move.title ,move.overview);
  })
    res.send(moves)
    console.log(moves);
})
  .catch((error)=>{
    console.log(error);
  })
  

}
//Git Similar Movie
function handelSimilar(req,res){
  
  let moveid=req.query.moveID;
  let urlSearchId=`https://api.themoviedb.org/3/movie/${moveid}/similar?api_key=34352ea0b463d37374bea163efd76b36`
  axios.get(urlSearchId)
  .then(result=>{
    
    let moves=result.data.results.map(move=>{
      return new searchId(move.id , move.title ,move.overview);
  })
    res.send(moves)
    console.log(moves);
})
  .catch((error)=>{
    console.log(error);
  })
  

}

//home /
function handleFirstRoute(req,res){
    let arr=[]
    
      let newDat1=new newData(recipesData.title,recipesData.poster_path,recipesData.overview)
      arr.push(newDat1)

    res.json(arr);
}

//favorate
function handleFavorate(req,res){
    res.send("Welcome to my favorate page")

}

//error
app.get('/error', (req, res) => res.send(error()));

app.use(function (error, req, res, text) {
    console.log(error.stack);
    res.type('taxt/plain');
    res.status(500);
    res.send('Sorry, Something Went Wrong');
  })


  app.use(function (req, res, text) {
    res.status(404);
    res.type('text/plain');
    res.send('Page Not Found');
  });

//listen
app.listen(port,()=>{
console.log(`Example App listening on port ${port}`);
})

//constructor for old data
function newData(title , poster_path,overview){
this.title=title
this.poster_path=poster_path
this.overview=overview
}

//constructor for new data
function newData2(id,title,release_date , poster_path,overview){
  this.id=id;
  this.title=title;
  this.release_date=release_date;
  this.poster_path=poster_path;
  this.overview=overview;
  }

  //constructor for search data
  function searchData(id,title,release_date , poster_path,overview){
    this.id=id;
    this.title=title;
    this.release_date=release_date;
    this.poster_path=poster_path;
    this.overview=overview;
    }

//constructor for Recomandation vedio by id
    function searchId(id,title,overview){
      this.id=id;
      this.title=title;
      this.overview=overview;
      }