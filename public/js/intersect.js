const Book = require("../../models/book");

function getIntersection(cst, cet, st, et) {
  let mst = cst.split(":");
  let met = cet.split(":");
  let ist = st.split(":");
  let iet = et.split(":");
  let cst1 = parseInt(mst[0]);
  let cst2 = parseInt(mst[1]);
  let cet1 = parseInt(met[0]);
  let cet2 = parseInt(met[1]);
  let st1 = parseInt(ist[0]);
  let st2 = parseInt(ist[1]);
  let et1 = parseInt(iet[0]);
  let et2 = parseInt(iet[1]);

  if (cst === st && cet === et) {
    return false;
  }

  if (et1 === cst1) {
    if (et2 === cst2) {
      return false;
    } else if (et2 > cst2) {
      if (st1 === cet1) {
        if (st2 === cet2) {
          return false;
        } else if (st2 < cet2) {
          return true;
        }
      } else if (st1 < cet1) {
        return true;
      }
    }
  } else if (et1 > cst1) {
    if (st1 === cet1) {
      if (st2 === cet2) {
        return false;
      } else if (st2 < cet2) {
        return true;
      }
    } else if (st1 < cet1) {
      return true;
    }
  }
}

function IntersectValue(dataArr, obj) {
  let change = false;

  for (let i = 0; i < dataArr.length; i++) {
    change = getIntersection(
      dataArr[i].strttime,
      dataArr[i].endtime,
      obj.strttime,
      obj.endtime
    );
    if (change === true && obj.bk === true) {
      // console.log(dataArr[i]);
      Book.update(
        {
          day: dataArr[i].day,
          lt: dataArr[i].lt,
          strttime: dataArr[i].strttime,
          endtime: dataArr[i].endtime
        },
        { $inc: { intersect: 1 } },
        (err, doc) => {
          if (err) console.log(err);
          else {
            //console.log(doc);
          }
        }
      );
    } else if (change === true && obj.bk === false) {
      Book.update(
        {
          day: dataArr[i].day,
          lt: dataArr[i].lt,
          strttime: dataArr[i].strttime,
          endtime: dataArr[i].endtime
        },
        { $inc: { intersect: -1 } },
        (err, doc) => {
          if (err) console.log(err);
          else {
            //console.log(doc);
          }
        }
      );
    }
  }
}

function Intersect(obj) {
  Book.find({ day: obj.day, lt: obj.lt }, function(err, data) {
    IntersectValue(data, obj);
  });
}

module.exports = Intersect;
