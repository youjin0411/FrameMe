const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

// Multer 설정
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// 이미지 업로드 라우트
app.post('/upload', upload.single('image'), (req, res) => {
    try {
        console.log(req.file);
        res.status(200).json({
            message: "File uploaded successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "File upload failed"
        });
    }
});

// '/upload' 경로에 대한 GET 요청 처리
app.get('/upload', (req, res) => {
    res.status(405).send('Method Not Allowed');
});

app.listen(3001, () => {
    console.log('Server listening on port 3001');
});