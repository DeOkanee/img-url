const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const { Readable } = require('stream');


// Inisialisasi aplikasi Express
const app = express();
app.use(cors());
app.use(express.static('public')); // Melayani file statis dari folder 'public'

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: 'cloud_name',    // Ganti dengan Cloud Name Cloudinary kamu
  api_key: 'api_key',          // Ganti dengan API Key Cloudinary kamu
  api_secret: 'api_secret'     // Ganti dengan API Secret Cloudinary kamu
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
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Jalankan server
app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});