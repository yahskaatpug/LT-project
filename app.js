var express = require("express");
var mongoose = require("mongoose");
var User = require("./models/user");
var engine = require("ejs-mate");
var passport = require("passport");
var ejs = require("ejs");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var flash = require("connect-flash");
var passportLocalMongoose = require("passport-local-mongoose");
var dbConn = "mongodb://akki:qwerty123@ds037688.mlab.com:37688/lts";
mongoose.connect(dbConn);
var port = process.env.PORT || 3000;

//var mainRoutes = require("./routes/main");
var userRoutes = require("./routes/user");

// var port = process.env.PORT || 8080;
var app = express();

// app.set("views", __dirname);
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.engine("ejs", engine);
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //complex algo for parsing

app.use(
  require("express-session")({
    secret: "whats up",
    resave: false,
    saveUninitialized: false
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//app.use(mainRoutes);
app.use(userRoutes);

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.message = req.flash("error");
  next();
});

app.listen(port, function() {
  console.log("server is running");
});
