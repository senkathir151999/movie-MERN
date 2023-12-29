const constants = require("../constants");


async function uploadImg(req, res) {
    const path = req.file.path.replace("\\", "/").replace("\\", "/");
    return res.status(200).json(path);
}

async function uploadPdf(req, res) {
    
    const path = req.file.path.replace("\\", "/").replace("\\", "/");
    return res.status(200).json({path:path});
}

module.exports.uploadImg = uploadImg;
module.exports.uploadPdf = uploadPdf;