var express = require("express");
var router = express.Router();
var pool = require("./pool");

router.get("/fetch_all_screen", function (req, res, next) {
  console.log(req.query);
  pool.query("select * from screen where cinemaid=?",[req.query.cinemaid],function (error, result) {
      if (error) 
      {
        console.log(error);
        res.status(500).json({ result: [], message: "Server Error: issue in database" });
      } 
      else 
      {
        res.status(200).json({ result: result, message: "Success" });
      }
    });
});

module.exports = router;
