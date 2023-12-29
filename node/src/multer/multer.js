

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, "uploads/images");
    } else if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      cb(null, "uploads/sheets");
    } else if (file.mimetype === "application/pdf") {
      cb(null, "uploads/pdf");
    } else {
      // console.log(file.mimetype);
      cb({ error: "Type is not supported" });
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
