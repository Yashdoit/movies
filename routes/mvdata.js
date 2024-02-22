var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.get("/moviesinterface", function (req, res, next) {
  res.render("moviesinterface", { message: "" });
});

router.post("/submit_movie", upload.single("poster"), function (req, res) {
  pool.query(
    "insert into mvdata(stateid, cityid, cinemaid, screenid, moviename, description, releasedate, ticketprice, status, actor, poster, actress, singers) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.stateid,
      req.body.cityid,
      req.body.cinemaid,
      req.body.screenid,
      req.body.moviename,
      req.body.description,
      req.body.date,
      req.body.ticketprice,
      req.body.status,
      req.body.actor,
      req.file.filename,
      req.body.actress,
      req.body.singer,
    ],
    function (error, result) {
      console.log("BODY", req.body);
      console.log("FILE", req.file);

      if (error) {
        console.log(error);res.render("moviesinterface", {message: "Server Error: Failed To Submit"});
      } 
      else 
      {
        res.render("moviesinterface", {message: "Record Successfully Submitted"});
      }
    });
});
module.exports = router;
