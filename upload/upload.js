import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: 'cloud_name',    // Ganti dengan Cloud Name Cloudinary kamu
  api_key: 'api_key',          // Ganti dengan API Key Cloudinary kamu
  api_secret: 'api_secret'     // Ganti dengan API Secret Cloudinary kamu
});

// Menangani upload
export default async (req, res) => {
  if (req.method === 'POST') {
    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Upload failed' });
        return;
      }

      const file = files.image[0];
      const filePath = file.filepath;
      const fileBuffer = fs.readFileSync(filePath);

      try {
        const result = await cloudinary.uploader.upload_stream({ resource_type: 'image', format: path.extname(filePath).slice(1) }, (error, result) => {
          if (error) return res.status(500).json({ error: 'Upload failed' });
          res.json({ url: result.secure_url });
        }).end(fileBuffer);
      } catch (error) {
        res.status(500).json({ error: 'Upload failed' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
