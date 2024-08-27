const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');

// Inisialisasi aplikasi Express
const app = express();
app.use(cors());
app.use(express.static('public')); // Melayani file statis dari folder 'public'

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: 'dr8dzahhw',    // Ganti dengan Cloud Name Cloudinary kamu
  api_key: '744248224393952',          // Ganti dengan API Key Cloudinary kamu
  api_secret: '2DU1TkcN9z4WTZi_VE44QEYUiGo'     // Ganti dengan API Secret Cloudinary kamu
});

// Konfigurasi Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Fungsi untuk meng-upload file ke Cloudinary
function uploadToCloudinary(buffer, format) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ resource_type: 'image', format: format }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    }).end(buffer);
  });
}

// Endpoint untuk meng-upload gambar
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype.split('/')[1]);
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Jalankan server
// App.listen tidak diperlukan di Vercel, mereka akan mengatur port untuk Anda
