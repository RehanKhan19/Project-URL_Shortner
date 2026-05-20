const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
    const body= req.body;
    if(!body.url) return res.status(400).json({error: "url is required"});
    const shortID=shortid();
    await URL.create({
        shortId:shortID,
        redirectUrl:body.url,
        visitHistory:[],
    }
    );
    return res.json({ id: shortID});
}

async function handleAnalytics(req, res){
    const shortId= req.params.shortId;
    const result = await URL.findOne(
        {shortId: shortId}
    )
    if(!result){
        return res.status(404).send({
            error: "URL not found"
        })
    }
    if(result.visitHistory.length===0){
        return res.send({
            clicks : result.visitHistory.length,
        })
    }
    return res.json({
        clicks: result.visitHistory.length,
        timestamps: result.visitHistory
    })
    }

module.exports={
    handleGenerateNewShortUrl,
    handleAnalytics
}