import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Ambil token dari header 'Authorization'
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer <token>"
  console.log(authHeader)

  if (!token) return res.status(401).json({ message: "Akses ditolak, token hilang" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Data user (id & email) sekarang ada di req.user
    next(); // Lanjut ke fungsi berikutnya
  } catch (err) {
    res.status(403).json({ message: "Token tidak valid atau expired" });
  }
};