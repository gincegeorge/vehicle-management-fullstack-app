const multer = require('multer');

// set storage
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/uploads');
    },
    filename: (req, file, callback) => {
        const extension = file.originalname.substr(file.originalname.lastIndexOf('.'));
        callback(null, `${file.fieldname}_${Date.now()}${extension}`);
    },
});

store = multer({ storage });

module.exports = store;