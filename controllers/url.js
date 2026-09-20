const shortid = require('shortid');
const URL = require('../models/url');

async function handleHomeTestPage(req,res){
    const allurls=await URL.find({});
        return res.render("homeTest",
            {
                urls: allurls,
            }
        );
}

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
        }
    );
    return res.render('home', 
        { id: shortID }
    )
}

async function handleAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne(
        { shortId: shortId }
    )
    if (!result) {
        return res.status(404).send({
            error: "URL not found"
        })
    }
    if (result.visitHistory.length === 0) {
        return res.send(
            {
                redirectUrl: result.redirectUrl,
                clicks: result.visitHistory.length
            }
        )
    }
    return res.json({
        redirecturl: result.redirectUrl,
        clicks: result.visitHistory.length,
        timestamps: result.visitHistory
    })
}

async function handleAllUrls(req, res){
    const allUrls=await URL.find({});
    return res.send(
        `
        <html>
        <head></head>
        <body>
            <ol>
                ${allUrls.map(url => `<li>
                    ${url.shortId}   ->   ${url.redirectUrl} : ${url.visitHistory.length}
                </li>`).join("")}
            </ol>
        </body>
        </html>
        `
    )
}

async function handleRedirect(req, res){
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
}


module.exports = {
    handleGenerateNewShortUrl,
    handleAnalytics,
    handleAllUrls,
    handleRedirect,
    handleHomeTestPage
}