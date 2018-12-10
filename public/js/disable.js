
$(document).ready(function() {
  $("button.t_button").click(function(e) {
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
  //   doAjax(obj);
  //   window.location.reload(true);
  //   async function doAjax(obj) {
  //   let result;

  //   try {
  //       result = await $.ajax({
  //           url: "http://localhost:3000/update_bk",
  //           type: 'POST',
  //           data: JSON.stringify(obj),
  //          // refresh:window.location.reload(true)
  //       });
        
  //       return result;
  //   } catch (error) {
  //       console.error(error);
  //   }
  // }
  console.log("wuewquewyeuieyreureuiytuth");
    $.ajax({
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      url: "http://localhost:3000/update_bk",
      success: function(json,status) {
        console.log("success");
        //console.log(status + "---------------------------");
        //window.location.reload(true);
      },
      error: function(error) {
        console.log("error");
        //window.location.reload(true);
      },
      time:setTimeout(() => {
        window.location.reload(true);
      }, 1000)
      //refresh:window.location.reload(true)
    });
    // console.log("hi");
  //   $.post("http://localhost:3000/update_bk",
  //   {
  //       day: Monday,
  //       lt: 2,
  //       strttime: '8:00',
  //       endtime: '9:00',
  //       bk: false,
  //       intersect: 0
  //   },
  //   function(data, status){
  //     console.log("TADAAAA!")
  //     window.location.reload(true);
  //   });
  //   window.location.reload(true);
  });
});
