const express=require("express");

const { handleGenerateNewShortUrl, handleAnalytics }=require("../controllers/url")

const URL=require('../models/url')

const router=express.Router();

router.post("/", handleGenerateNewShortUrl)


router.get("/:id", async (req, res)=>{
    const shortId=req.params.id;    
    const entry = await URL.findOneAndUpdate({
        shortId: shortId //searches for the variable shortId in db as shortId stored in db
    }, { $push: {
        visitHistory: {
            timestamp: Date.now()
        }
    }})
    if(!entry){
        return res.send({
            error: "Wrong URL"
        })
    }
    res.redirect(entry.redirectUrl);
})


router.get("/analytics/:shortId", handleAnalytics)
module.exports=router;