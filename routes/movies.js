var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");
var LocalStorage = require('node-localstorage').LocalStorage
localstorage = new LocalStorage('./scratch')

router.get("/moviesinterface", function (req, res, next) {
  try
  {
      var data = JSON.parse(localStorage.getItem('ADMIN'))
      if(data==null)
      {
        res.render('adminpage',{message:''})
      }
      else
      {
        res.render('moviesinterface',{message:""})
      }
  }
  catch(e)
  {
    res.render('adminpage',{message:""})
  }
  
  res.render("moviesinterface");
});

router.get("/displayallmovies", function (req, res, next) {

  try
  {
    var data = JSON.parse(localStorage.getItem("ADMIN"))
    if(data==null)
    {
      res.render('adminpage',{message:""})
    }
    else
    {
      pool.query("select M.*,(select S.statename from states S where S.stateid= M.stateid) as statename, (select C.cityname from city C where C.cityid= M.cityid) as cityname, (select CN.cinemaname from cinema CN where CN.cinemaid= M.cinemaid) as cinemaname, (select SC.Screenname from screen SC where SC.screenid= M.screenid) as screenname from mvdata M", function (error, result) {
        if (error) 
        {
          res.render("displayallmovies", {data: [],status: false,message: "Server Error: Contact Server Admin"});
        } 
        else 
        {
          if (result.length == 0) {
            res.render("displayallmovies", {data: result,status: false,message: "No Record Found"});
          } 
          else 
          {
            res.render("displayallmovies", {data: result,status: true,message: "Success",});
          }
        }
      });
    }
  }
  catch(e)
  {
    res.render('adminpage',{message:''})
  }

  
});


router.get('/display_movies_by_id',function(req,res,next){
  pool.query("select M.*,(select S.statename from states S where S.stateid= M.stateid) as statename, (select C.cityname from city C where C.cityid= M.cityid) as cityname, (select CN.cinemaname from cinema CN where CN.cinemaid= M.cinemaid) as cinemaname, (select SC.Screenname from screen SC where SC.screenid= M.screenid) as screenname from mvdata M where movieid=?",[req.query.movieid], function (error, result) {
    if(error)
    {
      res.render("displaymoviesbyid", {data: [],status: false, message:"Server Error: Contact Admin"})
    }
    else
    {
      res.render("displaymoviesbyid", {data:result[0],status: false, message:"Server Error: Contact Admin"})
    }
  })
})


router.post('/edit_delete_movie',function(req,res,next){
  var btn = req.body.btn
  if(btn=='Edit')
  {
    pool.query("update mvdata set stateid=?, cityid=?, cinemaid=?, screenid=?, moviename=?, description=?, releasedate=?, ticketprice=?, status=?, actor=?, actress=?, singers=? where movieid=?",[req.body.stateid, req.body.cityid, req.body.cinemaid, req.body.screenid, req.body.moviename, req.body.description, req.body.date, req.body.ticketprice, req.body.status, req.body.actor, req.body.actress, req.body.singer, req.body.movieid],function(error,result){
      if(error)
      {
        res.redirect("/movies/displayallmovies")
      }
      else
      {
        res.redirect("/movies/displayallmovies")
      }
    })
  }
  else
  {
    pool.query("delete from mvdata where movieid=?",[req.body.movieid],function(error,result){
      if(error)
      {
        res.redirect("/movies/displayallmovies")
      }
      else
      {
        res.redirect("/movies/displayallmovies")
      }
    })
  }


})



router.get('/show_picture',function(req,res,next){
  res.render('showpicture',{data:req.query})
})



router.post('/edit_picture',upload.single('poster'),function(req,res,next){
  pool.query("update mvdata set poster=? where movieid=?",[req.file.filename, req.body.movieid],function(error,result){
      if(error)
      {
          res.redirect('/movies/displayallmovies')
      }
      else
      {
        res.redirect('/movies/displayallmovies')
      }
  })
})


router.get("/show_details", function (req, res, next) {

  try
  {
    var data = JSON.parse(localStorage.getItem("ADMIN"))
    if(data==null)
    {
      res.render('adminpage',{message:""})
    }
    else
    {
      pool.query("select M.*,(select S.statename from states S where S.stateid= M.stateid) as statename, (select C.cityname from city C where C.cityid= M.cityid) as cityname, (select CN.cinemaname from cinema CN where CN.cinemaid= M.cinemaid) as cinemaname, (select SC.Screenname from screen SC where SC.screenid= M.screenid) as screenname from mvdata M", function (error, result) {
        if (error) 
        {
          res.render("showdetails", {data: [],status: false,message: "Server Error: Contact Server Admin"});
        } 
        else 
        {
          if (result.length == 0) {
            res.render("showdetails", {data: result,status: false,message: "No Record Found"});
          } 
          else 
          {
            res.render("showdetails", {data: result,status: true,message: "Success",});
          }
        }
      });
    }
  }
  catch(e)
  {
    res.render('adminpage',{message:''})
  }

  
});




// router.get('/new_display_movies_by_id/:movieid',function(req,res,next){
//   pool.query("select M.*,(select S.statename from states S where S.stateid= M.stateid) as statename, (select C.cityname from city C where C.cityid= M.cityid) as cityname, (select CN.cinemaname from cinema CN where CN.cinemaid= M.cinemaid) as cinemaname, (select SC.Screenname from screen SC where SC.screenid= M.screenid) as screenname from mvdata M where movieid=?",[req.params.movieid], function (error, result) {
//     if(error)
//     {
//       res.render("displaymoviesbyid", {data: [],status: false, message:"Server Error: Contact Admin"})
//     }
//     else
//     {
//       res.render("displaymoviesbyid", {data:result[0],status: false, message:"Server Error: Contact Admin"})
//     }
//   })
// })



// router.get('/newapi/:id/:name',function(req,res,next){
//   console.log("DATA ID:",req.params.id)
//   console.log("DATA NAME:",req.params.name)
//   res.status(200),json({status:"ok"})

// })



module.exports = router;
