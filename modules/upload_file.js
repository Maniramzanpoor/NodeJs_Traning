const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

module.exports.uploadfile = (req, res, uploadPath = "") => {
  if (req.method.toLowerCase() === "post") {
    if (!fs.existsSync(path.join(__dirname, "..", "uploads", "files"))) {
      fs.mkdirSync(path.join(__dirname,"..","uploads/files"), { recursive: true });
    }
    const form = new formidable.IncomingForm({
      uploadDir: path.join(__dirname, "..", "uploads", "files"),
      keepExtensions: true,
      multiples: true,
      allowEmptyFiles: false,
    });
    form.parse(req, function (err, fields, files) {});
    return "file uploded .";
  } else {
    const htmlForm = fs.readFileSync(
      path.join(__dirname, "..", "fileUpload.html"),
      "utf-8"
    );
    return htmlForm;
  }
};
