function randomColor() {
  var rn;
  var hex = ['8','9','A','B','C','D','E','F']
  var colorChars = []

  for (var i = 0; i < 6; i++) {
    rn = Math.floor(Math.random() * 6) + 1
    colorChars.push(hex[rn])
  }

  return colorChars.join("")
}

$(document).ready(function(){
  $("#suite-details").hide();

  $("#save-suite").on("click", function(e){
    var elm = $(this)

    e.preventDefault();
    $.ajax({
       beforeSend: setupData(),
       method: "POST",
       url: "/update",
       data: $("#suite :input").filter(function(){
         return $(this).attr("name") != "perform_action"
       }).serialize()
    }).done(function(e){
      elm.css("background-color", "#" + randomColor());
    });
  });

  $("#add-more-query").on("click", function(e){
    e.preventDefault();
    var content = $("#suite-details").clone();
    content.css("display", "block");
    $("#additional-query").append(content.html());
  });

  $("#placeholder-button").on("click", function(e){
    e.preventDefault();
    $(".placeholder-container").css("display", "block");
  });

  function setupData() {
    $("#suite-connection-name").val($("#editable-connection-name").html());
    $("#suite-description").val($("#editable-description").html());
    $("#suite-placeholder").val($("#editable-placeholder").html());
    $("#suite-name").val($("#editable-suite-name").html());
    $.each($("#suite :input"), function(index, el){
      var result = $.trim($(el).val());
      $(this).val(result);
    });
  }
});
