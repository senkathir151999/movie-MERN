const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async-middleware');
const uploadController = require('../controllers/upload_controller');
const upload = require("../multer/multer");

router.post('/image', upload.single('image'), [
    // jwtController.isValid,
    asyncMiddleware(uploadController.uploadImg),
]);

router.post('/pdf', upload.single('pdf'), [
    // jwtController.isValid,
    asyncMiddleware(uploadController.uploadPdf),
]);




module.exports = router;