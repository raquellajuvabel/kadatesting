import express from "express";

const app = express()

app.use((req,res,next)=>{
    if(false){
        next(new Error('Not Authorized'));
    return;
}
    next();
});

app.use((err,req,res,next)=>{
    res.send("Error Occurred");
});

app.get('/',(req,res)=>{
    res.send('Hello Raquella!');
});


app.get (`/say/:greeting`, (req,res) => {
    const {greeting} = req.params;
    res.send(greeting);
});

app.listen(3000);