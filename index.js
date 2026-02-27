import express from "express";
import mongoose from "mongoose";
import noteRouter from "./routes/notes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
// const uri = process.env.MONGO_URI;
const uri = "mongodb://raquellaraquellaa_db_user:admin123@ac-ubalf4g-shard-00-00.p8srec1.mongodb.net:27017,ac-ubalf4g-shard-00-01.p8srec1.mongodb.net:27017,ac-ubalf4g-shard-00-02.p8srec1.mongodb.net:27017/test?ssl=true&replicaSet=atlas-3z36w4-shard-0&authSource=admin"
const uri1 = "mongodb+srv://raquellaraquellaa_db_user:admin123@cluster0.p8srec1.mongodb.net/?appName=Cluster0"
console.log(uri);
mongoose
  .connect(uri1)
  .then(() => console.log("✅ Berhasil terhubung ke MongoDB"))
  .catch((err) => {
    console.error("❌ Mongo error:", err.message);
    // process.exit(1); 
  });

app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE"],
}));
app.use(express.json());


/* ======================
   ROUTES
====================== */

app.get("/", (req, res) => {
  res.send('Hello Raquella!');
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



/* ======================
   LISTEN (PALING TERAKHIR)
====================== */

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

export default app;