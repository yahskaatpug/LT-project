console.log("wowowow");

$(document).ready(function() {
  $("button.t_button").click(function() {
    let x = $(this).parents("li");
    let d = x
      .children(".x")
      .text()
      .trim();
    let l = x
      .children(".y")
      .text()
      .match(/\d/g)[0];
    let st = x
      .children(".z")
      .text()
      .trim()
      .split("---")[0];
    let et = x
      .children(".z")
      .text()
      .trim()
      .split("---")[1];
    let bk = x
      .children(".w")
      .text()
      .trim();
    let intersect = x
      .children(".intersect")
      .text()
      .trim();
    obj = {};
    obj = {
      day: d,
      lt: l,
      strttime: st,
      endtime: et,
      bk: bk,
      intersect: intersect
    };
    // console.log(obj);

    $.ajax({
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      url: "http://localhost:3000/update_bk",
      success: function(json) {
        console.log("success");
      },
      error: function(error) {
        console.log("error");
      }
    });
    window.location.reload(true);
  });
});
