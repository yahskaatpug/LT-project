var router = require("express").Router();
var User = require("../models/user");
var Book = require("../models/book");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var bodyparser = require("body-parser");
let get_slots = require("../public/js/list_slot");
var cron = require("node-schedule");
var path = require("path");
var Intersect = require("../public/js/intersect");
//var Recaptcha = require("express-recaptcha").Recaptcha;

//var recaptcha = new Recaptcha("site key", "secret key");
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var rule2 = new cron.RecurrenceRule();
rule2.dayOfWeek = 1;
rule2.hour = 20;
rule2.minute = 12;

cron.scheduleJob(rule2, function() {
  console.log("This runs at 3:10AM every Friday, Saturday and Sunday.");
  Book.updateMany({ bk: true }, { $set: { bk: false } }, (err, doc) => {
    if (err) console.log(err);
    else {
      console.log(doc);
    }
  });
  // return "wow";
});

router.get("/", function(req, res) {
  res.render("main/home", {
    currentUser: req.user,
    message: req.flash("error")
  });
});
router.get("/register", function(req, res) {
  //show signUp page
  res.render("accounts/register", { currentUser: req.user });
});
//login routes
router.get("/login", function(req, res) {
  //render login form
  res.render("accounts/login", {
    currentUser: req.user,
    message: req.flash("error"),
    captcha: res.recaptcha
  });
});



router.get("/profile", isLoggedIn, function(req, res) {
  var message = "";
  if (req.query.search) {
    var a = new Date(req.query.search);

    console.log(a);
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
    var r = weekdays[a.getDay()];
    function getMonday(d) {
      d = new Date(d);
      var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
      return new Date(d.setDate(diff));
    }

    var b = getMonday(new Date());
    var d = Math.floor(
      (Date.UTC(a.getFullYear(), a.getMonth(), a.getDate()) -
        Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  

    var regex = new RegExp(escapeRegex(r), "gi");
    if (d >= 0 && d <= 6) {
      Book.find({ day: regex }, function(err, x) {
        if (err) {
          console.log(err);
        } else {
          res.render("accounts/profile", {
            x: x,
            currentUser: req.user,
            message: message
          });
        }
      });
    } else {
      Book.find({ day: regex }, function(err, x) {
        if (err) {
          console.log(err);
        } else {
          req.flash("error", "Booking available only for the current week!!");
          res.render("accounts/profile", {
            x: x,
            currentUser: req.user,
            message: req.flash("error")
          });
        }
      });
    }
  } else {
    Book.find({}, function(err, x) {
      if (err) console.log(err);
      else {
        res.render("accounts/profile", {
          x: x,
          currentUser: req.user,
          message: message
        });
        
      }
    });
  }
});
// router.get("/booking", function(req, res) {
//   Book.find({},(err,x) =>{
//     if(err)
//          console.log(err);
//     else
//       res.render('main/booking',{x:x,currentUser: req.user });
//   });

//   //show signUp page
// });
router.post("/register", function(req, res) {
  //handling user sign up
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function(err, user) {
      if (err) {
        //req.flash("error","You logged out!!");
        res.render("accounts/register", { currentUser: req.user });
      } else {
        passport.authenticate("local")(req, res, function() {
          res.redirect("/profile");
        });
      }
    }
  );
});

// router.get("/profile", isLoggedIn, function(req, res) {

//   res.render("accounts/profile", { currentUser: req.user });
// });

router.get("/profile/new", isLoggedIn, function(req, res) {
  res.render("main/lecture");
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

//login logic
//middleware
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true
  }),
 
);

router.get("/logout", function(req, res) {
  req.logout();
  req.flash("error", "You logged out!!");
  res.redirect("/login");
});

// router.get("/booking", isLoggedIn, function(req, res) {
//   res.render("main/booking");
// });
router.post("/profile", function(req, res) {
  //2. create route:to add new campground to db
  var day = req.body.day;
  var strttime = req.body.strttime;
  var endtime = req.body.endtime;
  let st_slot = strttime.split(":");
  let et_slot = endtime.split(":");
  let arr = st_slot.concat(et_slot);
  var lt = req.body.lt;
  var ask = { id: req.user._id };
  var book_id = req.user._id;
  var intersect = req.user.intersect;
  get_slots(arr, lt, day, ask, book_id, res, intersect);
  //   username:req.user.username};
  // var newBook = { day: day, strttime: strttime, endtime: endtime, lt: lt, ask: ask };
  // console.log(req.body);
  // Book.create(newBook, function (err, Book) {
  //   if (err)
  //     console.log(err);
  //   else
  //     res.redirect("/profile");
  // })
});
router.post("/update_bk",async (req, res) => {
  console.log("wwwww");
  let x = String(req.body.bk) === "true";
  let y = !x;
  //console.log(y);
  let s_obj = {
    day: req.body.day,
    strttime: req.body.strttime.replace(" ", ""),
    endtime: req.body.endtime.replace(" ", ""),
    lt: req.body.lt,
    bk: x
  };

  await Book.update(s_obj, { $set: { bk: y, book_id: req.user._id } }, (err, doc) => {
    if (err) console.log(err);
    else {
      //console.log(doc);
    }
  });
  s_obj.bk = y;
  await Intersect(s_obj);

  // Book.find({ "strttime": req.body.strttime.replace(" ", ""), "endtime": req.body.endtime.replace(" ", "") }, (err, doc) => {
  //   if (err) console.log(err);
  //   else {
  //     console.log(doc);
  //   }
  // });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "login first");
  res.redirect("/login");
}
module.exports = router;
