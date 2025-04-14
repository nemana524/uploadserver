const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
      return;
    }
    cb(null, true);
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileInfo = {
    filename: req.file.filename,
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    path: `/uploads/${req.file.filename}`,
    uploadedAt: new Date().toISOString()
  };

  res.json({
    message: 'File uploaded successfully',
    file: fileInfo
  });
});

// Get all uploaded files
app.get('/files', (req, res) => {
  const uploadDir = 'uploads';
  if (!fs.existsSync(uploadDir)) {
    return res.json([]);
  }

  const files = fs.readdirSync(uploadDir).map(filename => {
    const stats = fs.statSync(path.join(uploadDir, filename));
    return {
      filename,
      path: `/uploads/${filename}`,
      size: stats.size,
      uploadedAt: stats.mtime
    };
  });

  res.json(files);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 