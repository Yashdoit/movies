var express = require('express')
var router = express.Router()
var pool   = require('./pool')
var LocalStorage = require('node-localstorage').LocalStorage
localStorage = new LocalStorage('./scratch')

router.get("/adminpage",function(req,res,next){
    try
    {
        var data = JSON.parse(localStorage.getItem('ADMIN'))
        res.render('adminpage')
        if(data==null)
        {
            res.render('adminpage')
        }
        else
        {
            var data=JSON.parse(localStorage.getItem("ADMIN"))
            res.render('dashboard',{data:data})
        }
    }
    catch(e)
    {
        res.render('adminpage')
    }
    
})

router.get("/adminlogoutpage",function(req,res,next){
    localStorage.clear()
    res.render('adminpage')
})


router.post("/check_admin_login",function(req,res){
    pool.query("select * from admins where (mobileno=? or emailid=?) and password=?",[req.body.emailid,req.body.emailid,req.body.password],function(error,result){
        if(error)
        {
            console.log(error)
            res.render('adminpage',{message:"Server Error Contact Admin"})
        }
        else
        {
            if(result.length==1)
            {
                localStorage.setItem("ADMIN",JSON.stringify(result[0]))
                res.render('dashboard',{data:result[0]})
            }
            else
            {
                res.render('adminpage',{message:"Invalid Emailid/Mobileno/Password"})   
            }
        }
    })
})




module.exports=router;