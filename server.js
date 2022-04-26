'use strict'



const express = require('express')
const { handle } = require('express/lib/application')
const recipesData=require("./Move Data/data.json")

const app =express()
const port=3001

app.get("/",handleFirstRoute)
app.get("/favorite",handleFavorate)

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

//constructor
function newData(title , poster_path,overview){
this.title=title
this.poster_path=poster_path
this.overview=overview
}