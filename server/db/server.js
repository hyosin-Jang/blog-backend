const express=require("express");
const app=express();
const members=require('./routes/members');
const categories=require('./routes/categories');
const boards=require('./routes/boards');
const comments=require('./routes/comments');

app.use('/members',members);
app.use('/categories',categories);
app.use('/boards',boards);
app.use('/comments',comments);

app.listen(3306,()=>{
    console.log("running");
});