const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
require('dotenv').config();  // Untuk membaca file .env

// Inisialisasi aplikasi Express
const app = express();
app.use(cors());
app.use(express.static('public')); // Melayani file statis dari folder 'public'

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: 'dwpnsfghy',    // Ganti dengan Cloud Name Cloudinary kamu
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Konfigurasi Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Fungsi untuk meng-upload file ke Cloudinary
function uploadToCloudinary(buffer, format) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: 'image', format: format },
      (error, result) => {
        if (error) {
          console.error('Cloudinary Upload Error:', error);  // Logging untuk memeriksa kesalahan
          return reject(error);
        }
        resolve(result);
      }
    ).end(buffer);
  });
}

// Endpoint untuk meng-upload gambar
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const fileFormat = req.file.mimetype.split('/')[1];
    const result = await uploadToCloudinary(req.file.buffer, fileFormat);
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Error uploading:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Jalankan server
app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});

