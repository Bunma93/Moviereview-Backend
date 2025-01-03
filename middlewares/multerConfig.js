const multer = require('multer');
const path = require('path');

// ตั้งค่า Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // โฟลเดอร์สำหรับเก็บไฟล์
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // ตั้งชื่อไฟล์ใหม่
  },
});

// ตัวกรองประเภทไฟล์
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/; // ประเภทไฟล์ที่อนุญาต
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Only .png, .jpg and .jpeg formats allowed!'));
  }
};

// Export การตั้งค่า Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // จำกัดขนาดไฟล์ 2MB
  fileFilter: fileFilter,
});

module.exports = upload;