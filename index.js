const express=require('express');
const urlRoute=require('./routes/url');
const staticRoute=require('./routes/staticRouter');
const userRoute=require('./routes/user');
const cookieParser=require('cookie-parser');
const {checkForAuthentication, restrictTo}=require('./middlewares/auth')
const path=require("path")

const { connectToMongoDB } = require('./connect');
const app=express();
const PORT=8001;
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication)

connectToMongoDB("mongodb://localhost:27017/short-url").then(()=>console.log("MongoDB connected!"))

app.use('/url', restrictTo(["NORMAL"]), urlRoute);
app.use('/user', userRoute);
app.use('/', staticRoute);

app.listen(PORT, ()=>console.log(`App started at port: ${PORT}\nURL: http://localhost:${PORT}`));