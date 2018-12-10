var bodyparser = require("body-parser");
let get_slots = require("../public/js/list_slot");
var router = require("express").Router();
var User = require("../models/user");
var Book = require("../models/book");
var path = require("path");
var Intersect = require("../public/js/intersect");