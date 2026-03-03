import express from "express";
import {User} from "../models/index.js";

const router = express.Router();

/* ======================
   REGISTER
====================== */

router.get("/", async (req,res,next)=>{
  try{
    const user = await User.find ().select("-password");
    res.json(user);
  }catch (e){
    next(e);
  }
});


router.post("/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // validasi field
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Semua field wajib diisi",
      });
    }

    // cek password sama
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password dan konfirmasi password tidak sama",
      });
    }

    // cek email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email sudah terdaftar",
      });
    }
    

    // simpan user (password otomatis di-hash)
    const user = new User({ name, email, password });
   
    await user.save();
    console.log("Sampai sini")
    

    res.status(201).json({
      message: "Register berhasil",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ======================
   LOGIN
====================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // cari user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Username dan/atau password salah, silahkan coba lagi",
      });
    }

    // compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Username dan/atau password salah, silahkan coba lagi",
      });
    }

    res.json({
      message: "Login berhasil",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;