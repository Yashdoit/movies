$(document).ready(function () {
  $.get("/states/fetch_all_states", function (data) {
    //alert(data.message)

    console.log("STATES", data);

    data.result.map((item) => {
      // alert(item.statename)

      $("#stateid").append($("<option>").text(item.statename).val(item.stateid));
    });
  });



  $("#stateid").change(function () {
    $.get("/city/fetch_all_city",{ stateid: $("#stateid").val() },function (data){
        $("#cityid").empty();

        console.log("CITY", data);

        $("#cityid").append($("<option>").text("City"));

        data.result.map((item) => {
          $("#cityid").append($("<option>").text(item.cityname).val(item.cityid));
        });
      });
  });



  $("#cityid").change(function () {
    $.get("/cinema/fetch_all_cinema",{ cityid: $("#cityid").val() },function (data) {
        $("#cinemaid").empty();

        console.log("CINEMA", data);

        $("#cinemaid").append($("<option>").text("Cinema"));

        data.result.map((item) => {
          $("#cinemaid").append($("<option>").text(item.cinemaname).val(item.cinemaid));
        });
      });
  });


  $("#cinemaid").change(function () {
        $.get("/screen/fetch_all_screen",{ cinemaid: $("#cinemaid").val() },function (data) {
        $("#screenid").empty();

        console.log("SCREEN", data);

        $("#screenid").append($("<option>").text("Select Screen"));

        data.result.map((item) => {
          $("#screenid").append($("<option>").text(item.screenname).val(item.screenid));
        });
      });
  });


  $("#poster").change(function (e) {
    
    // alert('Clicked')

    $("#posterimage").attr('src',URL.createObjectURL(e.currentTarget.files[0]))

  })



});


