// /api/upload.js
import cloudinary from 'cloudinary';
import multer from 'multer';
import { NextResponse } from 'next/server';

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: 'dr8dzahhw',    // Ganti dengan Cloud Name Cloudinary kamu
  api_key: '744248224393952', // Ganti dengan API Key Cloudinary kamu
  api_secret: '2DU1TkcN9z4WTZi_VE44QEYUiGo' // Ganti dengan API Secret Cloudinary kamu
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'image', format: file.type.split('/')[1] }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }).end(file.buffer);
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
