var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var exphbs = require("express-handlebars");



//require all models
var db = require("./models");

var PORT = 3000;

//initialize Express
var app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//use morgan logger for logging requests
app.use(logger("dev"));
//parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Make public a statis folder
app.use(express.static("public"));

//connect to the Monogo DB

mongoose.connect("mongodb://localhost/recipes", { useNewUrlParser: true });

//Routes

//A GET routes for scraping the recipe site

app.get("/scrape", function (req, res) {
  //we grab the body of the html with axios
  axios.get("https://www.allrecipes.com/").then(function (response) {

    //Then we load that into cheerio and it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    //now we grab every h2 within an article tag, and go to the following:


    $("#fixedGridSection > article> a").each(function (i, element) {

      console.log(element);
      // save an empty result object
      var result = {};

      //add the text and href of every link, and save them as properties of the result object
      result.link = $(this)
        .attr("href")
      
      result.title = $(this)
        .attr("text")