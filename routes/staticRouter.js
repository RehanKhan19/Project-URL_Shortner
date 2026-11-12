// '/'

const express=require("express");
const URL =require('../models/url');
const { restrictTo } = require("../middlewares/auth");
const router=express.Router();

//for admin(admin can see all urls)
router.get('/admin/urls', restrictTo(["ADMIN"]), async(req, res)=>{
    const allUrls=await URL.find({});
    return res.render('home', { urls: allUrls });
})


//for normal user(normal user can only see urls created by him)
router.get('/', restrictTo(["NORMAL", "ADMIN"]), async(req, res)=>{
    const allUrls=await URL.find({createdBy: req.user._id});
    return res.render('home', { urls: allUrls });
})



router.get('/signup', (req, res)=>{
    return res.render('signUp');
})

router.get('/login', (req, res)=>{
    return res.render('login'); 
})


module.exports=router;