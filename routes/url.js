const express=require("express");

const { handleGenerateNewShortUrl, handleAnalytics, handleAllUrls, handleRedirect, handleHomeTestPage }=require("../controllers/url")

const URL=require('../models/url')

const router=express.Router();

router.get("/homeTest", handleHomeTestPage)
router.post("/", handleGenerateNewShortUrl)

router.get("/allurls", handleAllUrls)

router.get("/analytics/:shortId", handleAnalytics)

router.get("/:id", handleRedirect)

module.exports=router;