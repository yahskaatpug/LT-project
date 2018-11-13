// $("ul").on("click", "li", function() {
//   $(this).toggleClass("completed");
// });

$(document).ready(function() {
  $(".fa-plus").click(function() {
    $("input").fadeToggle();
  });

  $("input").keypress(function(event) {
    if (event.which === 13) {
      var valTodo = $(this).val();
      $(this).val("");
      $("ul.booking").append(
        "<li><span><i class='fa fa-trash'></i> </span>" + valTodo + "</li>"
      );
      console.log($(this).val());
    }
  });

  $("ul.booking").on("click", "span", function(event) {
    let x = $(this);
    let y =
      "<li><span><i class='fa fa-trash'></i> </span>" +
      x.parent().text() +
      "</li>";

    // console.log(x.val());
    x.parent().fadeOut(0, function() {
      $(this).remove();
    });
    $("ul.free-slot")
      .append(y)
      .fadeIn(10000);
    event.stopPropagation();
  });

  $("ul.free-slot").on("click", "span", function(event) {
    let x = $(this);
    let y =
      "<li><span><i class='fa fa-trash'></i> </span>" +
      x.parent().text() +
      "</li>";

    // console.log(x.val());
    x.parent().fadeOut(0, function() {
      $(this).remove();
    });
    $("ul.booking")
      .append(y)
      .fadeIn(10000);
    event.stopPropagation();
  });
});
