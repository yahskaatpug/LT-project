var Book = require("../../models/book");

let lh;
let Day;
let id;
let bookid;
let intersect;

function gentime(h1, m1, h2, m2, d) {
  max_range = (h2 - h1) * 60 + (m2 - m1);
  dr = d * 60;
  arr = [];
  t_sum = 0;
  while (t_sum + dr <= max_range) {
    arr.push(h1 + t_sum / 60);
    t_sum = t_sum + 30;
  }
  // console.log(arr);
  return arr;
}

function IsFloat(n) {
  return parseInt(n) !== n;
}

async function print_time(x) {
  let arr_1 = [];
  let dur = 0.5;
  for (k = 0; k < x.length; k++) {
    let arr_2 = [];
    for (l = 0; l < x[k].length; l++) {
      let arr_3 = [];
      //console.log(dur + "------->");
      for (m = 0; m < x[k][l].length; m++) {
        y = IsFloat(x[k][l][m]);
        a = parseInt(x[k][l][m]);
        b = x[k][l][m] - Math.floor(x[k][l][m]);
        c = parseInt(dur);
        d = dur - Math.floor(dur);
        var newBook = {};
        if (y === true) {
          let strttime = a + ":" + b * 60;
          let endtime;
          if (b + d === 0.5) {
            endtime = a + c + ":" + (b + d) * 60;
            newBook = {
              day: Day,
              strttime: strttime,
              endtime: endtime,
              lt: lh,
              ask: id,
              book_id: bookid,
              intersect: intersect
            };
            booking = new Book(newBook);
            await booking.save((err, Book) => {
              if (err) console.log(err);
             // else //console.log("done");
              // res.redirect("/profile/new");
            });
            // console.log(
            //   a + ":" + b * 60 + " <------> " + (a + c) + ":" + (b + d) * 60
            // );
          } else if (b + d === 1) {
            endtime = a + c + 1 + ":00";
            newBook = {
              day: Day,
              strttime: strttime,
              endtime: endtime,
              lt: lh,
              ask: id,
              book_id: bookid,
              intersect: intersect
            };
            booking = new Book(newBook);
            await booking.save((err, Book) => {
              if (err) console.log(err);
              //else //console.log("done");
              // res.redirect("/profile/new");
            });
            //console.log(a + ":" + b * 60 + " <------> " + (a + c + 1) + ":00");
          }
          // newBook = { day: Day, strttime: strttime, endtime: endtime, lt: lh, ask: id };

          arr_3.push(a + ":" + b * 60);
        } else {
          let strttime = x[k][l][m] + ":00";
          let endtime;

          if (d + b === 0.5) {
            endtime = x[k][l][m] + c + ":" + (b + d) * 60;
            newBook = {
              day: Day,
              strttime: strttime,
              endtime: endtime,
              lt: lh,
              ask: id,
              book_id: bookid,
              intersect: intersect
            };
            booking = new Book(newBook);
            await booking.save((err, Book) => {
              if (err) console.log(err);
              //else //console.log("done");
              // res.redirect("/profile/new");
            });
            
          } else if (b + d === 0) {
            endtime = x[k][l][m] + c + ":00";
            newBook = {
              day: Day,
              strttime: strttime,
              endtime: endtime,
              lt: lh,
              ask: id,
              book_id: bookid,
              intersect: intersect
            };
            booking = new Book(newBook);
            await booking.save((err, Book) => {
              if (err) console.log(err);
              //else console.log("done");
              // res.redirect("/profile/new");
            });
            // console.log(
            //   x[k][l][m] + ":00" + " <------> " + (x[k][l][m] + c) + ":00"
            // );
          }
          // newBook = { day: Day, strttime: strttime, endtime: endtime, lt: lh, ask: id };
          arr_3.push(x[k][l][m] + ":00");
        }
        // booking = await new Book(newBook);
        // await booking.save((err, Book) => {
        //   if (err)
        //     console.log(err);
        //   else
        //     console.log("done")
        //   // res.redirect("/profile/new");
        // });
      }
      dur += 0.5;
      arr_2.push(arr_3);
    }
    arr_1.push(arr_2);
  }
}

// [12, 00, 14, 30], [15, 00, 18, 30]
async function multi_time(t, lt, day, ask, book_id, res, inter) {
  let arr_t = [];
  p_time = t.map(e => parseInt(e));
  lh = lt;
  Day = day;
  id = ask;
  intersect = inter;
  bookid = book_id;
  arr_t.push(p_time);
  let dur_ar = [0.5, 1, 1.5, 2];
  for (let i = 0; i < arr_t.length; i++) {
    let all_slots = [];
    let slot_arr = [];
    for (let k = 0; k < dur_ar.length; k++) {
      x = await gentime(
        arr_t[i][0],
        arr_t[i][1],
        arr_t[i][2],
        arr_t[i][3],
        dur_ar[k]
      );
      slot_arr.push(x);
    }
    all_slots.push(slot_arr);
    await print_time(all_slots);
  }
  res.redirect("/profile");
}

// multi_time();

module.exports = multi_time;
