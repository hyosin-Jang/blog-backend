const express=require("express");
const app=express();
const members=require('./routes/members');
const categories=require('./routes/categories');

app.use('/members',members);
app.use('/categores',categories);

app.listen(3306,()=>{
    console.log("running");
});
