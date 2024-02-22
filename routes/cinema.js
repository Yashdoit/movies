var express = require("express");
var router = express.Router();
var pool = require("./pool");

router.get("/fetch_all_cinema", function (req, res, next) {
  pool.query("select * from cinema where cityid=?",[req.query.cityid],function (error, result) {
      if (error)
       {
        console.log(error);
        res.status(500).json({ result: [], message: "Error: Issue In Database" });
      } 
      else 
      {
        res.status(200).json({ result: result, message: "Success:" });
      }
    }
  );
});

module.exports = router;
