import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  // 1. Buat transporter (koneksi ke Gmail)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // Karena kita pakai port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS, // Ini akan membaca kode 16 digit tadi
    },
  });


// 2. Tentukan opsi email
  const mailOptions = {
    // Ganti nama pengirim di sini
    from: `"LashMatch Official" <${process.env.SMTP_USER}>`, 
    to: options.email,
    // Subject sekarang fleksibel mengikuti apa yang dikirim dari routes
    subject: options.subject, 
    text: options.message,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #444; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="color: #8e224d; text-align: center;">Welcome to LashMatch! ✨</h2>
        
        <p style="line-height: 1.6;">${options.message}</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="http://localhost:3001/login" style="background-color: #942b55; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Kunjungi Website Kami</a>
        </div>
        <hr style="border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #999; text-align: center;">
          © 2026 LashMatch Beauty Studio. <br>
          Dikirim otomatis oleh Sistem LashMatch
        </p>
      </div>`,
  };

  // 3. Kirim email beneran
  await transporter.sendMail(mailOptions);
};

export default sendEmail;