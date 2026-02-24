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

app.get('/', (req, res) => {
  res.send('<h1 style="color: pink;">Hello Raquella!</h1>');
});

app.get (`/say/:greeting`, (req,res) => {
    const {greeting} = req.params;
    res.send(greeting);
});

app.get('/world', (req, res) => {
  res.send(`
    <body style="
      margin: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      color: pink;
      font-size: 80px;
    ">
      ʕっ•ᴥ•ʔっ
    </body>
  `);
});

app.listen(3000);