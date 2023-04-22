const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// multer를 사용해서 jsx에서 업로드한 사진들을 받는다. (콘텐트 타입 지정함.)
const storage = multer.diskStorage({
    // 이미지 경로 지정
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    // 파일 이름 경로 지정 
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// 에러 로컬 3000번에서 받아오는 에러 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/upload', upload.single('image'), (req, res) => {
    try {
        console.log(req.file);
        res.status(200).json({
            message: 'File uploaded successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'File upload failed'
        });
    }
});

// uploads 폴더에 있는 파일을 브라우저에서 제공하기 위해
// express.static 미들웨어를 사용하여 uploads 폴더를 public 폴더로 매핑합니다.
app.use('/public', express.static(path.join(__dirname, 'uploads')));

// 이미지를 브라우저에서 띄웁니다.
app.get('/images/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, 'uploads', imageName);
    res.sendFile(imagePath);
});

app.get('/upload', (req, res) => {
    try {
        const files = fs.readdirSync('./uploads');
        const fileNames = files.map((file) => {
            return file;
        });
        const html = fileNames.map((fileName) => {
            const filePath = path.join('/public', fileName);
            return `<img src="${filePath}" alt="${fileName}"/>`;
        }).join('');
        res.status(200).send(html);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to load files'
        });
    }
});

app.listen(3001, () => {
    console.log('Server listening on port 3001');
});