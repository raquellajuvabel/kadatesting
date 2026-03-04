import express from "express";
import { User } from "../models/index.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

/* ======================
    GET ALL USERS
====================== */
router.get("/", async (req, res, next) => {
  try {
    const user = await User.find().select("-password");
    res.json(user);
  } catch (e) {
    next(e);
  }
});

/* ======================
    REGISTER
====================== */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // 1. Validasi field kosong
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    // 2. Cek password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password dan konfirmasi password tidak sama" });
    }

    // 3. Cek email sudah terdaftar atau belum
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // 4. Simpan user ke Database
    const user = new User({ name, email, password });
    await user.save();
    
    console.log("User berhasil disimpan, mencoba mengirim email...");

    // 5. Kirim Email (Gunakan try-catch terpisah agar tidak menggagalkan register jika email error)
    try {
      await sendEmail({
        email: user.email,
        subject: "Selamat Datang di LashMatch!",
        message: `Halo ${user.name}, akun Anda berhasil dibuat. Selamat bergabung!`,
      });
      console.log("Email berhasil terkirim ke:", user.email);
    } catch (emailErr) {
      console.error("Gagal mengirim email selamat datang:", emailErr.message);
    }

    // 6. Response Sukses
    res.status(201).json({
      message: "Register berhasil",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================
    LOGIN
====================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Cari user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Username dan/atau password salah" });
    }

    // 2. Compare password (asumsi ada method comparePassword di model User)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Username dan/atau password salah" });
    }

    // 3. Buat JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.json({
      message: "Login berhasil",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;