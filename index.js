import express from "express";
import noteRouter from './routes/notes.js';

import mongoose from 'mongoose';
// import { Post } from './models/index.js';


// Post kini tersedia untuk digunakan langsung

const app = express()
app.use(express.json())


//Post available for Immediate use

// app.use((req,res,next)=> {
// if (!true(req)){
// next(newError('Not Authorized'));
// return;
// }
// next();
//});



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

app.use('/notes', noteRouter);

/// KONEKSI DENGAN PROTOKOL +srv YANG BENAR
const uri = "mongodb://raquellaraquellaa_db_user:admin123@ac-ubalf4g-shard-00-00.p8srec1.mongodb.net:27017,ac-ubalf4g-shard-00-01.p8srec1.mongodb.net:27017,ac-ubalf4g-shard-00-02.p8srec1.mongodb.net:27017/test?ssl=true&replicaSet=atlas-3z36w4-shard-0&authSource=admin";

mongoose.connect(uri,{serverSelectionTimeoutMS:5000})
  .then(() => console.log("Berhasil terhubung ke Cluster Baru!"))
  .catch(err => console.error("Masih error login:", err));


app.use((req,res,next)=>{
    if(false){
        next(new Error('Not Authorized'));
    return;
}
    next();
});

app.use((err,req,res,next)=>{
  console.log(err)
    res.send("Error Occurred");
});


app.listen(3000,()=>{
  console.log(`Server running on port 3000`);
});//

//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });