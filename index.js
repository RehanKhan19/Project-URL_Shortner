const express=require('express');
const urlRoute=require('./routes/url')
const staticRoute=require('./routes/staticRouter')
const path=require("path")

const { connectToMongoDB } = require('./connect');
const app=express();
const PORT=8001;
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

connectToMongoDB("mongodb://localhost:27017/short-url").then(()=>console.log("MongoDB connected!"))

app.use('/url', urlRoute);
app.use('/', staticRoute);

app.listen(PORT, ()=>console.log(`App started at port: ${PORT}\nURL: http://localhost:${PORT}`));