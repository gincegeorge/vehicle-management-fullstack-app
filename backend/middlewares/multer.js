const multer = require('multer');

// set storage
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log('1111111111111111111');
        callback(null, 'public/uploads');
    },
    filename: (req, file, callback) => {
        console.log('111112222222222221111');
        const extension = file.originalname.substr(file.originalname.lastIndexOf('.'));
        callback(null, `${file.fieldname}_${Date.now()}${extension}`);
    },
});

store = multer({ storage });

module.exports = store;