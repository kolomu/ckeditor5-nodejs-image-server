const express = require('express')
const cors = require('cors');
const multer = require('multer');
const app = express();
const port = 3001;

app.use(function (err, req, res, next) {
    console.log('This is the invalid field ->', err.field)
    next(err)
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public')
    },
    filename: function (req, file, cb) {
        let fileName = file.originalname.toLowerCase();
        let fileExtension;

        if (fileName.endsWith('.jpg')) {
            fileExtension = '.jpg';
        } else if (fileName('.png')) {
            fileExtension = '.png'
        }
        cb(null, file.fieldname + '-' + Date.now() + fileExtension)
    }
});

const upload = multer({ storage: storage });

app.use(express.static('public'))
app.use(cors());

app.post('/upload', upload.any(), function (req, res, next) {
    if(!req.file) {
        return;
    }
    
    res.send({ "url": 'http://localhost:3001/' + req.file.filename });
    res.status(204).end();
});

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));