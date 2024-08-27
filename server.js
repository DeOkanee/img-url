const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('public')); // Melayani file statis dari folder 'public'
app.use('/uploads', express.static('uploads')); // Melayani file yang diunggah dari folder 'uploads'

// Konfigurasi multer untuk menyimpan file di direktori 'uploads'
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Endpoint untuk mengunggah gambar
app.post('/upload', upload.single('image'), (req, res) => {
    res.json({ url: `http://localhost:3000/uploads/${req.file.filename}` });
});

// Jalankan server
app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
