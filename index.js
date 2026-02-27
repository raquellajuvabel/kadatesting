import express from "express";
import mongoose from "mongoose";
import noteRouter from "./routes/notes.js";

const app = express();
app.use(express.json());

/* ======================
   ROUTES
====================== */

app.get("/", (req, res) => {
  res.send('<h1 style="color: pink;">Hello Raquella!</h1>');
});

app.get("/say/:greeting", (req, res) => {
  const { greeting } = req.params;
  res.send(greeting);
});

app.get("/world", (req, res) => {
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

app.use("/notes", noteRouter);

/* ======================
   MIDDLEWARE (AUTH / ETC)
====================== */

app.use((req, res, next) => {
  // contoh auth (sementara lolos semua)
  next();
});

/* ======================
   ERROR HANDLER (PALING BAWAH)
====================== */

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Error Occurred");
});

/* ======================
   DATABASE
====================== */

const uri =
  "mongodb://raquellaraquellaa_db_user:admin123@ac-ubalf4g-shard-00-00.p8srec1.mongodb.net:27017,ac-ubalf4g-shard-00-01.p8srec1.mongodb.net:27017,ac-ubalf4g-shard-00-02.p8srec1.mongodb.net:27017/test?ssl=true&replicaSet=atlas-3z36w4-shard-0&authSource=admin";

mongoose
  .connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log("Berhasil terhubung ke MongoDB"))
  .catch((err) => console.error("Mongo error:", err));

/* ======================
   LISTEN (PALING TERAKHIR)
====================== */

app.listen(3000, () => {
  console.log("Server running on port 3000");
});