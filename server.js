// express 모듈을 사용하여 서버 구축
const express = require('express');
// app은 express의 인스턴스
const app = express();
// path 모듈을 사용하여 경로 설정. 사용하는 이유는 운영체제마다 경로 표기법이 다르기 때문
const path = require('path');
// multer 패키지는 파일 업로드를 위한 미들웨어이다. 
const multer = require('multer');

// Multer 설정
// 즉 파일을 저장할 경로와 파일명을 설정하는 부분이다.
const storage = multer.diskStorage({ //diskStorage() 메소드는 파일을 저장할 경로와 파일명을 설정하는 메소드이다.
    destination: function(req, file, cb) { // destination() 메소드는 파일을 저장할 경로를 설정하는 메소드이다.
        cb(null, 'uploads/'); // cb() 메소드는 콜백 함수이다. 첫 번째 인자는 에러를 나타내는 객체이고 두 번째 인자는 실제 경로를 나타낸다.
    },
    filename: function(req, file, cb) { // filename() 메소드는 파일명을 설정하는 메소드이다.
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // cb() 메소드는 콜백 함수이다. 첫 번째 인자는 에러를 나타내는 객체이고 두 번째 인자는 실제 파일명을 나타낸다.
    }
});
const upload = multer({ storage: storage }); // multer() 메소드는 multer의 인스턴스를 생성하는 메소드이다.

// 이미지 업로드 라우트
app.post('/upload', upload.single('image'), (req, res) => { //upload.single() 메소드는 파일을 하나만 업로드할 때 사용하는 메소드이다.
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

// 정적 파일을 제공해서 업로드된 이미지를 브라우저에서 확인할 수 있도록 한다.
app.use(express.static('uploads'));

// '/upload' 경로에 대한 GET 요청 처리
app.get('/upload', (req, res) => {
    res.status(405).send('Method Not Allowed');
});

app.listen(3001, () => {
    console.log('Server listening on port 3001');
});