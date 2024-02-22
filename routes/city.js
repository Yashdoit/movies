var express = require('express')
var router  = express.Router()
var pool    = require('./pool')

router.get("/fetch_all_city", function (req, res, next) {
    pool.query("select * from city where stateid=?",[req.query.stateid], function (error, result) {
      if (error) 
      {

        console.log(error);
        res.status(500).json({ result: [], message: "Server error: issue in database" });

      } 
      else
      {

        res.status(200).json({ result: result, message: "Success" });
        
      }
    });
  });


module.exports=router;